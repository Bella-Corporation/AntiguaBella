import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Payment not configured" });
  }

  const { session_id } = req.body as { session_id?: string };
  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(200).json({ status: "unpaid" });
    }

    const inquiry_id = session.metadata?.inquiry_id ?? null;

    if (inquiry_id) {
      // Use service role key to bypass RLS for this server-side status update
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && serviceKey) {
        const supabase = createClient(supabaseUrl, serviceKey);
        const { error } = await supabase
          .from("inquiries")
          .update({ status: "deposit_paid" })
          .eq("id", inquiry_id);

        if (error) {
          console.error("Failed to update inquiry status:", error);
        }
      } else {
        console.warn("Supabase service role key not configured — inquiry status not updated");
      }
    }

    return res.status(200).json({ status: "paid", inquiry_id });
  } catch (err) {
    console.error("Payment verification error:", err);
    return res.status(500).json({ error: "Could not verify payment" });
  }
}
