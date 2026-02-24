import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSlotsForDate } from "@/lib/slots";
import { sendEmail, sendSms } from "@/lib/notifications";
import { isValidEmail, isValidIndianPhone, normalizePhone } from "@/lib/validation";
import { getClinicWhatsappNumber, getGoogleMeetLink } from "@/lib/consultation";
import { createConsultationMeeting } from "@/lib/google-calendar";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.date || !body?.startUtc) {
    return NextResponse.json({ error: "date and startUtc are required" }, { status: 400 });
  }

  const { date, startUtc } = body;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!name || !email || !phoneRaw) {
    return NextResponse.json({ error: "name, email, and phone are required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid email address" }, { status: 400 });
  }
  if (!isValidIndianPhone(phoneRaw)) {
    return NextResponse.json({ error: "invalid phone number" }, { status: 400 });
  }
  const phone = normalizePhone(phoneRaw);

  const slots = buildSlotsForDate(date);
  const slot = slots.find((s) => s.startUtc.toISOString() === startUtc);
  if (!slot) {
    return NextResponse.json({ error: "invalid slot" }, { status: 400 });
  }

  const now = new Date();
  if (slot.startUtc <= now) {
    return NextResponse.json({ error: "slot time has already passed" }, { status: 409 });
  }

  await prisma.booking.updateMany({
    where: { status: "HOLD", holdExpires: { lt: now } },
    data: { status: "EXPIRED" },
  });

  const existing = await prisma.booking.findFirst({
    where: {
      startTime: slot.startUtc,
      status: { in: ["HOLD", "CONFIRMED"] },
    },
  });

  if (existing && (existing.status === "CONFIRMED" || (existing.holdExpires && existing.holdExpires > now))) {
    return NextResponse.json({ error: "slot already booked" }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      startTime: slot.startUtc,
      endTime: slot.endUtc,
      name,
      email,
      phone,
      status: "CONFIRMED",
      confirmedAt: now,
      holdExpires: null,
    },
  });

  const appointmentLabel = booking.startTime.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  let bookingMeetLink: string | null = null;
  try {
    const meetingResult = await createConsultationMeeting({
      bookingId: booking.id,
      patientName: booking.name ?? "Patient",
      patientEmail: booking.email ?? undefined,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
    if (meetingResult.ok) {
      bookingMeetLink = meetingResult.meetLink;
    }
  } catch (err) {
    console.error("Google Calendar event create failed", err);
  }

  const notifyPayload = {
    name: booking.name ?? "Patient",
    email: booking.email ?? "",
    phone: booking.phone ?? "",
    appointmentLabel,
    bookingId: booking.id,
    meetLink: bookingMeetLink ?? getGoogleMeetLink() ?? undefined,
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
      bookingId: booking.id,
      appointmentLabel,
      patientName: notifyPayload.name,
      email: notifyPayload.email,
      phone: notifyPayload.phone,
      confirmedAt: booking.confirmedAt?.toISOString() ?? null,
      googleMeetLink: bookingMeetLink ?? getGoogleMeetLink(),
      clinicWhatsappNumber: getClinicWhatsappNumber(),
    },
  });
}
