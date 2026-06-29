import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

interface PaymentIntentBody {
  bookingRequestId: string;
  userId: string;
  villaId: "antiguabella" | "antiguasoleil" | "both";
  villaLabel: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestCount: number;
  userEmail: string;
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

  const body = req.body as Partial<PaymentIntentBody>;
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
    !userEmail
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const stripe = new Stripe(secretKey);

  try {
    const { data: rateData, error: rateError } = await supabase
      .from("villa_rates")
      .select("nightly_rate_usd, cleaning_fee_usd")
      .eq("villa_id", villaId)
      .single();

    if (rateError || !rateData) {
      console.error("Failed to fetch villa rates:", rateError);
      return res.status(500).json({ error: "Could not load villa rates" });
    }

    const total = rateData.nightly_rate_usd * nights + rateData.cleaning_fee_usd;

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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      customer: stripeCustomerId,
      setup_future_usage: "off_session",
      automatic_payment_methods: { enabled: true },
      metadata: {
        booking_request_id: bookingRequestId,
        user_id: userId,
        villa_id: villaId,
        check_in: checkIn,
        check_out: checkOut,
      },
    });

    await supabase
      .from("booking_requests")
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq("id", bookingRequestId);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      total,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("create-payment-intent error:", err);
    return res.status(500).json({ error: "Could not create payment intent", detail: message });
  }
}
