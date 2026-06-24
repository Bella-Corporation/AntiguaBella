import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

interface CheckoutBody {
  bookingRequestId: string;
  userId: string;
  villaId: "antiguabella" | "antiguasoleil" | "both";
  villaLabel: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestCount: number;
  userEmail: string;
  origin: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secretKey) {
    return res.status(500).json({ error: "Payment not configured" });
  }
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: "Database not configured" });
  }

  const body = req.body as Partial<CheckoutBody>;
  const {
    bookingRequestId,
    userId,
    villaId,
    villaLabel,
    checkIn,
    checkOut,
    nights,
    guestCount,
    userEmail,
    origin,
  } = body;

  if (
    !bookingRequestId ||
    !userId ||
    !villaId ||
    !villaLabel ||
    !checkIn ||
    !checkOut ||
    nights == null ||
    guestCount == null ||
    !userEmail ||
    !origin
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const stripe = new Stripe(secretKey);

  try {
    // Step 2: Fetch villa rates from Supabase
    const { data: rateData, error: rateError } = await supabase
      .from("villa_rates")
      .select("nightly_rate_usd, cleaning_fee_usd")
      .eq("villa_id", villaId)
      .single();

    if (rateError || !rateData) {
      console.error("Failed to fetch villa rates:", rateError);
      return res.status(500).json({ error: "Could not load villa rates" });
    }

    // Step 3: Calculate total in cents
    const total = rateData.nightly_rate_usd * nights + rateData.cleaning_fee_usd;

    // Step 4: Find or create Stripe Customer
    let stripeCustomerId: string;

    const { data: existingBooking } = await supabase
      .from("booking_requests")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .not("stripe_customer_id", "is", null)
      .limit(1)
      .single();

    if (existingBooking?.stripe_customer_id) {
      stripeCustomerId = existingBooking.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { supabase_user_id: userId },
      });
      stripeCustomerId = customer.id;

      await supabase
        .from("booking_requests")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", bookingRequestId);
    }

    // Step 5: Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${villaLabel} — ${checkIn} to ${checkOut}`,
              description: `${nights} nights · ${guestCount} guests`,
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        setup_future_usage: "off_session",
        metadata: {
          booking_request_id: bookingRequestId,
          user_id: userId,
          villa_id: villaId,
          check_in: checkIn,
          check_out: checkOut,
        },
      },
      metadata: {
        booking_request_id: bookingRequestId,
      },
      success_url: `${origin}/request/confirmed?booking_id=${bookingRequestId}`,
      cancel_url: `${origin}/request`,
    });

    // Step 6: Update booking_requests to pending_payment
    const { error: updateError } = await supabase
      .from("booking_requests")
      .update({
        status: "pending_payment",
        stripe_session_id: session.id,
      })
      .eq("id", bookingRequestId);

    if (updateError) {
      console.error("Failed to update booking status:", updateError);
    }

    // Step 7: Return Stripe hosted checkout URL
    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", err);
    return res.status(500).json({ error: "Could not create checkout session", detail: message });
  }
}
