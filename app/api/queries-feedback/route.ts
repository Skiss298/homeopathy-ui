import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidEmail, isValidIndianPhone, normalizePhone } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const typeRaw = typeof body.type === "string" ? body.type.toUpperCase() : "";
  const type = typeRaw === "QUERY" || typeRaw === "FEEDBACK" ? typeRaw : null;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = Boolean(body.consent);

  if (!type || !name || !email || !phoneRaw || !message) {
    return NextResponse.json(
      { error: "type, name, email, phone, and message are required" },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json({ error: "consent is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid email address" }, { status: 400 });
  }
  if (!isValidIndianPhone(phoneRaw)) {
    return NextResponse.json({ error: "invalid phone number" }, { status: 400 });
  }

  const phone = normalizePhone(phoneRaw);
  const inquiry = await prisma.inquiry.create({
    data: {
      type,
      name,
      email,
      phone,
      message,
    },
    select: { id: true, type: true },
  });

  return NextResponse.json({ ok: true, id: inquiry.id, type: inquiry.type });
}
