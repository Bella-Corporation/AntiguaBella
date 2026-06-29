import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
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

// ─── Shared confirmation logic ────────────────────────────────────────────────

async function confirmBooking(params: {
  bookingRequestId: string;
  stripeEventId: string;
  amountTotal: number;
  guestEmail?: string;
  supabase: SupabaseClient;
  resend: Resend | null;
  ownerEmail: string | undefined;
}): Promise<void> {
  const { bookingRequestId, stripeEventId, amountTotal, guestEmail = "unknown", supabase, resend, ownerEmail } = params;

  // Idempotency check — fetch existing booking row
  const { data: booking, error: fetchError } = await supabase
    .from("booking_requests")
    .select("id, status, villa_id, check_in, check_out, user_id")
    .eq("id", bookingRequestId)
    .single();

  if (fetchError || !booking) {
    console.error("Failed to fetch booking_request:", fetchError);
    throw new Error("Booking record not found");
  }

  if (booking.status === "confirmed") {
    // Already processed — idempotent no-op
    return;
  }

  // Update booking_requests to confirmed
  const { error: updateError } = await supabase
    .from("booking_requests")
    .update({
      status: "confirmed",
      stripe_session_id: stripeEventId,
      total_amount_cents: amountTotal,
    })
    .eq("id", bookingRequestId);

  if (updateError) {
    console.error("Failed to confirm booking:", updateError);
    throw new Error("Failed to update booking status");
  }

  // Insert availability_blocks to hold the dates
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

  // Send Resend notification email to owner
  if (ownerEmail && resend) {
    const villaLabel =
      booking.villa_id === "both"
        ? "Both Villas"
        : booking.villa_id === "antiguabella"
          ? "AntiguaBella"
          : "AntiguaSoleil";

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
          totalCents: amountTotal ?? 0,
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
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

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

  // Read raw body for signature verification
  const rawBody = await readRawBody(req);

  // Verify Stripe signature
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

  // Only handle the two payment success events — ACK all others
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "payment_intent.succeeded"
  ) {
    return res.status(200).json({ received: true });
  }

  if (!supabaseUrl || !serviceKey) {
    console.error("Supabase service role key not configured");
    return res.status(500).json({ error: "Database not configured" });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const resend = resendKey ? new Resend(resendKey) : null;

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingRequestId = session.metadata?.booking_request_id;

      if (!bookingRequestId) {
        console.warn("checkout.session.completed missing booking_request_id in metadata");
        return res.status(200).json({ received: true });
      }

      await confirmBooking({
        bookingRequestId,
        stripeEventId: session.id,
        amountTotal: session.amount_total ?? 0,
        guestEmail: session.customer_details?.email ?? "unknown",
        supabase,
        resend,
        ownerEmail,
      });
    } else if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const bookingRequestId = intent.metadata?.booking_request_id;

      if (!bookingRequestId) {
        console.warn("payment_intent.succeeded missing booking_request_id in metadata");
        return res.status(200).json({ received: true });
      }

      await confirmBooking({
        bookingRequestId,
        stripeEventId: intent.id,
        amountTotal: intent.amount_received,
        supabase,
        resend,
        ownerEmail,
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("confirmBooking error:", message);
    return res.status(500).json({ error: message });
  }

  // Acknowledge webhook
  return res.status(200).json({ received: true });
}
