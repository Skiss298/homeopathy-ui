import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSlotsForDate } from "@/lib/slots";

export const runtime = "nodejs";

function startOfDayUtc(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
}

function endOfDayUtc(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date is required (YYYY-MM-DD)" }, { status: 400 });
  }

  const now = new Date();

  await prisma.booking.updateMany({
    where: {
      status: "HOLD",
      holdExpires: { lt: now },
    },
    data: { status: "EXPIRED" },
  });

  const slots = buildSlotsForDate(date);
  if (slots.length === 0) {
    return NextResponse.json({ error: "invalid date format" }, { status: 400 });
  }

  const booked = await prisma.booking.findMany({
    where: {
      startTime: { gte: startOfDayUtc(date), lte: endOfDayUtc(date) },
      status: { in: ["HOLD", "CONFIRMED"] },
    },
    select: { startTime: true, status: true, holdExpires: true },
  });

  const bookedSet = new Set(
    booked
      .filter((b) => b.status === "CONFIRMED" || (b.holdExpires && b.holdExpires > now))
      .map((b) => b.startTime.toISOString())
  );

  const response = slots.map((slot) => ({
    startUtc: slot.startUtc.toISOString(),
    endUtc: slot.endUtc.toISOString(),
    label: slot.label,
    status: bookedSet.has(slot.startUtc.toISOString()) ? "BOOKED" : "AVAILABLE",
  }));

  return NextResponse.json({ date, slots: response });
}
