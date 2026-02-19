import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const AMOUNT_INR = 100;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.bookingId) {
    return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay keys not configured" },
      { status: 501 }
    );
  }

  const booking = await prisma.booking.findUnique({ where: { id: body.bookingId } });
  if (!booking) {
    return NextResponse.json({ error: "booking not found" }, { status: 404 });
  }

  const now = new Date();
  if (booking.status === "HOLD" && booking.holdExpires && booking.holdExpires < now) {
    await prisma.booking.update({ where: { id: booking.id }, data: { status: "EXPIRED" } });
    return NextResponse.json({ error: "booking hold expired" }, { status: 409 });
  }

  if (booking.status === "CONFIRMED") {
    return NextResponse.json({ error: "booking already confirmed" }, { status: 409 });
  }

  const notes = {
    name: booking.name ?? "",
    email: booking.email ?? "",
    phone: booking.phone ?? "",
  };

  const payload = {
    amount: AMOUNT_INR * 100,
    currency: "INR",
    receipt: booking.id,
    notes,
  };

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.description || "Failed to create Razorpay order" },
      { status: 502 }
    );
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: { razorpayOrderId: data.id },
  });

  return NextResponse.json({
    orderId: data.id,
    amount: data.amount,
    currency: data.currency,
    keyId,
  });
}
