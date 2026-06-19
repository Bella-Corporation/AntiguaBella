import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  listing_name?: string;
  listing_type?: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  notes?: string;
}

function typeLabel(type?: string): string {
  switch (type) {
    case "villa":
      return "Villa Stay";
    case "experience":
      return "Experience";
    case "charter":
      return "Charter";
    default:
      return "General";
  }
}

function buildHtml(d: InquiryPayload): string {
  const rows = [
    ["Name", d.name],
    ["Email", `<a href="mailto:${d.email}" style="color:#c9a96e">${d.email}</a>`],
    d.phone ? ["Phone / WhatsApp", d.phone] : null,
    d.listing_name ? ["Listing", `${d.listing_name} (${typeLabel(d.listing_type)})`] : null,
    d.check_in ? ["Check-in", d.check_in] : null,
    d.check_out ? ["Check-out", d.check_out] : null,
    d.guests != null ? ["Guests", String(d.guests)] : null,
    d.notes ? ["Notes", d.notes] : null,
  ]
    .filter(Boolean)
    .map(
      (row) =>
        `<tr>
          <td style="padding:10px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#888;white-space:nowrap;vertical-align:top">${row![0]}</td>
          <td style="padding:10px 16px;font-size:14px;color:#f0ead6">${row![1]}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="background:#0d0d0d;margin:0;padding:32px 16px;font-family:Georgia,serif">
  <div style="max-width:560px;margin:0 auto">
    <p style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#c9a96e;margin:0 0 8px">AntiguaBella</p>
    <h1 style="font-size:24px;font-weight:400;color:#f0ead6;margin:0 0 4px">New Enquiry</h1>
    <p style="font-size:13px;color:#888;margin:0 0 32px">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p>

    <table style="width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:12px;overflow:hidden">
      <tbody>${rows}</tbody>
    </table>

    <div style="margin-top:24px;text-align:center">
      <a href="mailto:${d.email}?subject=Re: Your AntiguaBella Enquiry"
         style="display:inline-block;padding:12px 28px;border:1px solid #c9a96e;color:#c9a96e;font-size:11px;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;border-radius:6px">
        Reply to Guest
      </a>
    </div>

    <p style="margin-top:32px;font-size:11px;color:#555;text-align:center">
      Sent by bellacorporation.com · AntiguaBella Enquiry System
    </p>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) {
    console.error("OWNER_EMAIL env var is not set");
    return res.status(500).json({ error: "Notification recipient not configured" });
  }

  const payload = req.body as InquiryPayload;

  if (!payload?.name || !payload?.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const subject = payload.listing_name
      ? `New Enquiry — ${payload.listing_name} (${typeLabel(payload.listing_type)})`
      : "New Enquiry — AntiguaBella";

    const { error } = await resend.emails.send({
      from: "AntiguaBella Enquiries <noreply@bellacorporation.com>",
      to: ownerEmail,
      replyTo: payload.email,
      subject,
      html: buildHtml(payload),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Unexpected error in /api/notify:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
