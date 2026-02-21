import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSlotsForDate } from "@/lib/slots";

export const runtime = "nodejs";

const HOLD_MINUTES = 10;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.date || !body?.startUtc) {
    return NextResponse.json({ error: "date and startUtc are required" }, { status: 400 });
  }

  const { date, startUtc, name, email, phone } = body;
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "name, email, and phone are required" },
      { status: 400 }
    );
  }

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

  const holdExpires = new Date(now.getTime() + HOLD_MINUTES * 60 * 1000);
  const booking = await prisma.booking.create({
    data: {
      startTime: slot.startUtc,
      endTime: slot.endUtc,
      name,
      email,
      phone,
      status: "HOLD",
      holdExpires,
    },
  });

  return NextResponse.json({
    bookingId: booking.id,
    holdExpires: booking.holdExpires?.toISOString(),
    status: booking.status,
  });
}
