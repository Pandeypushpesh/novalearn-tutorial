import nodemailer from "nodemailer";

interface LoginEmailPayload {
  to: string;
  name?: string;
}

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

function isMailEnabled() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      (process.env.SMTP_USER || process.env.SMTP_FROM)
  );
}

async function getTransporter() {
  if (transporterPromise) {
    return transporterPromise;
  }

  if (!isMailEnabled()) {
    throw new Error("SMTP credentials are missing");
  }

  transporterPromise = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure:
      process.env.SMTP_SECURE === "true" ||
      Number(process.env.SMTP_PORT) === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        : undefined
  });

  return transporterPromise;
}

export async function sendLoginNotificationEmail({
  to,
  name
}: LoginEmailPayload) {
  if (!isMailEnabled()) {
    console.warn(
      "SMTP settings missing – skipping login email. Provide SMTP_* env vars to enable."
    );
    return;
  }

  const transporter = await getTransporter();
  const displayName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fromAddress =
    process.env.SMTP_FROM ??
    process.env.SMTP_USER ??
    "NovaLearn <no-reply@novalearn.com>";

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject: "Thanks for logging in to NovaLearn",
    text: [
      `Hi ${displayName},`,
      "",
      "Thanks for logging back into NovaLearn.",
      "You can pick up right where you left off here:",
      appUrl,
      "",
      "Happy learning!",
      "Team NovaLearn"
    ].join("\n"),
    html: [
      `<p>Hi ${displayName},</p>`,
      "<p>Thanks for logging back into <strong>NovaLearn</strong>.</p>",
      `<p><a href="${appUrl}" style="color:#2563eb;text-decoration:none;">Continue learning</a> whenever you're ready.</p>`,
      "<p>Happy learning!<br/>Team NovaLearn</p>"
    ].join("")
  });
}


