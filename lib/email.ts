import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    throw new Error(
      "Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variables. See .env.example."
    );
  }

  const resend = new Resend(apiKey);

  const { name, email, subject, message } = payload;

  return resend.emails.send({
    from: `Portfolio contact form <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; font-size: 14px; color: #14171F;">
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: none; border-top: 1px solid #D8DCE3; margin: 16px 0;" />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
