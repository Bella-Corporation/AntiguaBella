import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not set");
    return res.status(500).json({ error: "Payment not configured" });
  }

  const { inquiry_id, listing_name } = req.body as {
    inquiry_id?: string;
    listing_name?: string;
  };

  if (!inquiry_id) {
    return res.status(400).json({ error: "Missing inquiry_id" });
  }

  const depositAmountCents = parseInt(
    process.env.STRIPE_DEPOSIT_AMOUNT_CENTS ?? "50000"
  );

  const origin =
    (req.headers.origin as string) ||
    (req.headers.referer as string)?.replace(/\/$/, "") ||
    "https://antiguabella.com";

  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${listing_name ?? "AntiguaBella"} — Reservation Deposit`,
              description:
                "Secures your requested dates. Applied to your total balance upon confirmation.",
            },
            unit_amount: depositAmountCents,
          },
          quantity: 1,
        },
      ],
      metadata: { inquiry_id },
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/request`,
      allow_promotion_codes: false,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return res.status(500).json({ error: "Could not create checkout session" });
  }
}
