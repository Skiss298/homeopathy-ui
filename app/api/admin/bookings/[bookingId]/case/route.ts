import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ bookingId: string }>;
};

export async function POST(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { bookingId } = await params;
  if (!bookingId) {
    return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const caseSummary = typeof body?.caseSummary === "string" ? body.caseSummary.trim() : "";
  const medicationPlan = typeof body?.medicationPlan === "string" ? body.medicationPlan.trim() : "";

  if (caseSummary.length > 5000 || medicationPlan.length > 5000) {
    return NextResponse.json({ error: "case summary or medication text is too long" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId }, select: { id: true } });
  if (!booking) {
    return NextResponse.json({ error: "booking not found" }, { status: 404 });
  }

  const caseSheet = await prisma.caseSheet.upsert({
    where: { bookingId },
    create: {
      bookingId,
      caseSummary,
      medicationPlan,
    },
    update: {
      caseSummary,
      medicationPlan,
    },
  });

  return NextResponse.json({
    ok: true,
    caseSheet: {
      caseSummary: caseSheet.caseSummary ?? "",
      medicationPlan: caseSheet.medicationPlan ?? "",
      updatedAt: caseSheet.updatedAt.toISOString(),
    },
  });
}
