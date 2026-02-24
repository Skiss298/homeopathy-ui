import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, sendSms } from "@/lib/notifications";
import { getClinicWhatsappNumber, getGoogleMeetLink } from "@/lib/consultation";

export const runtime = "nodejs";

function verifySignature(orderId: string, paymentId: string, signature: string, secret: string) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${orderId}|${paymentId}`);
  const digest = hmac.digest("hex");
  return digest === signature;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || {};

  if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Razorpay secret not configured" }, { status: 501 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) {
    return NextResponse.json({ error: "booking not found" }, { status: 404 });
  }

  if (booking.razorpayOrderId && booking.razorpayOrderId !== razorpay_order_id) {
    return NextResponse.json({ error: "order id mismatch" }, { status: 409 });
  }

  const valid = verifySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    keySecret
  );
  if (!valid) {
    return NextResponse.json({ error: "signature verification failed" }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: "CONFIRMED",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      confirmedAt: new Date(),
    },
  });

  const appointmentLabel = updated.startTime.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const notifyPayload = {
    name: updated.name ?? "Patient",
    email: updated.email ?? "",
    phone: updated.phone ?? "",
    appointmentLabel,
    bookingId: updated.id,
  };

  try {
    if (notifyPayload.email) {
      await sendEmail(notifyPayload, "CONFIRMED");
    }
  } catch (err) {
    console.error("Email send failed", err);
  }

  try {
    if (notifyPayload.phone) {
      await sendSms(notifyPayload, "CONFIRMED");
    }
  } catch (err) {
    console.error("SMS send failed", err);
  }

  return NextResponse.json({
    status: "CONFIRMED",
    confirmation: {
      bookingId: updated.id,
      appointmentLabel,
      patientName: notifyPayload.name,
      email: notifyPayload.email,
      phone: notifyPayload.phone,
      razorpayOrderId: updated.razorpayOrderId,
      razorpayPaymentId: updated.razorpayPaymentId,
      confirmedAt: updated.confirmedAt?.toISOString() ?? null,
      googleMeetLink: getGoogleMeetLink(),
      clinicWhatsappNumber: getClinicWhatsappNumber(),
    },
  });
}
