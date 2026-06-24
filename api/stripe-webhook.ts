import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const config = { api: { bodyParser: false } };

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function buildConfirmationEmail(params: {
  villaId: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  totalCents: number;
  bookingId: string;
}): string {
  const { villaId, guestEmail, checkIn, checkOut, totalCents, bookingId } = params;
  const villaLabel =
    villaId === "both"
      ? "Both Villas (Full Estate)"
      : villaId === "antiguabella"
        ? "AntiguaBella"
        : "AntiguaSoleil";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="background:#0d0d0d;margin:0;padding:32px 16px;font-family:Georgia,serif">
  <div style="max-width:560px;margin:0 auto">
    <p style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#c9a96e;margin:0 0 8px">AntiguaBella</p>
    <h1 style="font-size:24px;font-weight:400;color:#f0ead6;margin:0 0 4px">New Booking Confirmed</h1>
    <p style="font-size:13px;color:#888;margin:0 0 32px">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p>
    <table style="width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:12px;overflow:hidden">
      <tbody>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Villa</td>
          <td style="padding:10px 16px;font-size:14px;color:#f0ead6">${villaLabel}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Guest Email</td>
          <td style="padding:10px 16px;font-size:14px;color:#f0ead6"><a href="mailto:${guestEmail}" style="color:#c9a96e">${guestEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Check-in</td>
          <td style="padding:10px 16px;font-size:14px;color:#f0ead6">${checkIn}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Check-out</td>
          <td style="padding:10px 16px;font-size:14px;color:#f0ead6">${checkOut}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Total Paid</td>
          <td style="padding:10px 16px;font-size:14px;color:#c9a96e;font-weight:bold">${formatUsd(totalCents)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">Booking ID</td>
          <td style="padding:10px 16px;font-size:11px;color:#888;font-family:monospace">${bookingId}</td>
        </tr>
      </tbody>
    </table>
    <p style="margin-top:32px;font-size:11px;color:#555;text-align:center">
      Sent by AntiguaBella Booking System · antiguabella.com
    </p>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!secretKey || !webhookSecret) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  // Step 1: Read raw body for signature verification
  const rawBody = await readRawBody(req);

  // Step 2: Verify Stripe signature
  const stripe = new Stripe(secretKey);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers["stripe-signature"] as string,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Webhook signature verification failed:", message);
    return res.status(400).json({ error: `Webhook signature invalid: ${message}` });
  }

  // Step 3: Only handle checkout.session.completed — ACK all others
  if (event.type !== "checkout.session.completed") {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Step 4: Read booking_request_id from metadata
  const bookingRequestId = session.metadata?.booking_request_id;
  if (!bookingRequestId) {
    console.warn("checkout.session.completed missing booking_request_id in metadata");
    return res.status(200).json({ received: true });
  }

  if (!supabaseUrl || !serviceKey) {
    console.error("Supabase service role key not configured");
    return res.status(500).json({ error: "Database not configured" });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Step 5: IDEMPOTENCY CHECK — fetch existing booking row
  const { data: booking, error: fetchError } = await supabase
    .from("booking_requests")
    .select("id, status, villa_id, check_in, check_out, user_id")
    .eq("id", bookingRequestId)
    .single();

  if (fetchError || !booking) {
    console.error("Failed to fetch booking_request:", fetchError);
    return res.status(500).json({ error: "Booking record not found" });
  }

  if (booking.status === "confirmed") {
    // Already processed — idempotent no-op
    return res.status(200).json({ received: true });
  }

  // Step 6: Update booking_requests to confirmed
  const { error: updateError } = await supabase
    .from("booking_requests")
    .update({
      status: "confirmed",
      stripe_session_id: session.id,
      total_amount_cents: session.amount_total,
    })
    .eq("id", bookingRequestId);

  if (updateError) {
    console.error("Failed to confirm booking:", updateError);
    return res.status(500).json({ error: "Failed to update booking status" });
  }

  // Step 7: Insert availability_blocks to hold the dates
  const { error: blockError } = await supabase.from("availability_blocks").insert({
    villa_id: booking.villa_id,
    start_date: booking.check_in,
    end_date: booking.check_out,
    reason: "booked",
    source: "manual",
    created_by: booking.user_id,
  });

  if (blockError) {
    console.error("Failed to insert availability block:", blockError);
    // Non-fatal: booking is confirmed; log and continue
  }

  // Step 8: Send Resend notification email to owner
  if (ownerEmail && resendKey) {
    const resend = new Resend(resendKey);
    const villaLabel =
      booking.villa_id === "both"
        ? "Both Villas"
        : booking.villa_id === "antiguabella"
          ? "AntiguaBella"
          : "AntiguaSoleil";

    const guestEmail = session.customer_details?.email ?? "unknown";

    try {
      await resend.emails.send({
        from: "AntiguaBella Bookings <onboarding@resend.dev>",
        to: ownerEmail,
        subject: `New Booking Confirmed — ${villaLabel} ${booking.check_in}`,
        html: buildConfirmationEmail({
          villaId: booking.villa_id,
          guestEmail,
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          totalCents: session.amount_total ?? 0,
          bookingId: bookingRequestId,
        }),
      });
    } catch (emailErr) {
      console.error("Failed to send owner notification:", emailErr);
      // Non-fatal: booking is confirmed; log and continue
    }
  } else {
    console.warn("Owner email or Resend key not configured — skipping notification");
  }

  // Step 9: Acknowledge webhook
  return res.status(200).json({ received: true });
}
