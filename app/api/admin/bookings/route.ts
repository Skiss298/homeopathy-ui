import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: "desc" },
    include: {
      caseSheet: true,
    },
  });

  return NextResponse.json({
    bookings: bookings.map((booking) => ({
      id: booking.id,
      name: booking.name ?? "",
      age: booking.age,
      email: booking.email ?? "",
      phone: booking.phone ?? "",
      status: booking.status,
      startTime: booking.startTime.toISOString(),
      endTime: booking.endTime.toISOString(),
      confirmedAt: booking.confirmedAt?.toISOString() ?? null,
      caseSheet: booking.caseSheet
        ? {
            caseSummary: booking.caseSheet.caseSummary ?? "",
            medicationPlan: booking.caseSheet.medicationPlan ?? "",
            updatedAt: booking.caseSheet.updatedAt.toISOString(),
          }
        : null,
    })),
  });
}
