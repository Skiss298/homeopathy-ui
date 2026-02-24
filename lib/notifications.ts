import nodemailer from "nodemailer";
import { getClinicWhatsappNumber, getGoogleMeetLink } from "@/lib/consultation";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_FROM;

type NotifyPayload = {
  name: string;
  email: string;
  phone: string;
  appointmentLabel: string;
  bookingId?: string;
};

type MessageKind = "HOLD" | "CONFIRMED";

function buildMessage(kind: MessageKind, { name, appointmentLabel }: NotifyPayload) {
  const meetLink = getGoogleMeetLink();
  const clinicWhatsappNumber = getClinicWhatsappNumber();

  if (kind === "CONFIRMED") {
    const parts = [`Hi ${name}, your appointment is confirmed for ${appointmentLabel} IST.`];
    if (meetLink) {
      parts.push(`Google Meet link: ${meetLink}`);
    }
    if (clinicWhatsappNumber) {
      parts.push(`WhatsApp support: https://wa.me/${clinicWhatsappNumber}`);
    }
    return parts.join(" ");
  }
  return `Hi ${name}, your appointment is held for ${appointmentLabel} IST. Please complete payment to confirm.`;
}

export async function sendEmail(payload: NotifyPayload, kind: MessageKind) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    return { ok: false, skipped: true, reason: "smtp_not_configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = kind === "CONFIRMED" ? "Appointment Confirmed" : "Appointment Slot Held";
  const text = buildMessage(kind, payload);

  await transporter.sendMail({
    from: SMTP_FROM,
    to: payload.email,
    subject,
    text,
  });

  return { ok: true, skipped: false };
}

export async function sendSms(payload: NotifyPayload, kind: MessageKind) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
    return { ok: false, skipped: true, reason: "sms_not_configured" as const };
  }

  const body = buildMessage(kind, payload);
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  const params = new URLSearchParams({
    From: TWILIO_FROM,
    To: payload.phone,
    Body: body,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Twilio SMS failed: ${errorText}`);
  }

  return { ok: true, skipped: false };
}
