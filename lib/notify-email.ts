import { Resend } from "resend"

const DEFAULT_TO = "om@horsebarn.ai"
const DEFAULT_FROM = "Barn AI Contact <onboarding@resend.dev>"

export async function sendContactNotification(payload: {
  name: string
  email: string
  message: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — skipping email notification.")
    return
  }

  const to = process.env.CONTACT_NOTIFY_EMAIL ?? DEFAULT_TO
  const from = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM

  const resend = new Resend(apiKey)

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  })

  const subject = `New Barn AI lead — ${payload.name}`

  const text = [
    `New contact form submission from www.horsebarn.ai`,
    ``,
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `When:    ${submittedAt} ET`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `---`,
    `Reply directly to this email to respond to the lead.`,
  ].join("\n")

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0f0c;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#1ea866;">New Barn AI lead</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:6px 0;color:#666;width:80px;">Name</td><td style="padding:6px 0;font-weight:500;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#1ea866;">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666;">When</td><td style="padding:6px 0;">${submittedAt} ET</td></tr>
      </table>
      <div style="background:#f7f7f5;border-left:3px solid #1ea866;padding:14px 16px;border-radius:4px;white-space:pre-wrap;line-height:1.5;">${escapeHtml(payload.message)}</div>
      <p style="margin-top:20px;font-size:12px;color:#888;">Reply to this email to respond to ${escapeHtml(payload.name)} directly.</p>
    </div>
  `

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html,
    replyTo: payload.email,
  })

  if (error) {
    console.error("[contact] resend send failed:", error)
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
