import { prisma } from "@/lib/prisma";

type UpsertPatientInput = {
  name: string;
  age: number;
  email: string;
  phoneCanonical: string;
};

function buildPatientCode() {
  const chunk = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SJH-${chunk}`;
}

export async function upsertPatientByPhone(input: UpsertPatientInput) {
  const existing = await prisma.patient.findUnique({
    where: { phone: input.phoneCanonical },
    select: { id: true, patientCode: true },
  });

  if (existing) {
    return prisma.patient.update({
      where: { id: existing.id },
      data: {
        name: input.name,
        age: input.age,
        email: input.email,
      },
    });
  }

  // Retry small collision chance on patientCode unique key.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      return await prisma.patient.create({
        data: {
          patientCode: buildPatientCode(),
          name: input.name,
          age: input.age,
          email: input.email,
          phone: input.phoneCanonical,
        },
      });
    } catch (error) {
      if (attempt === 4) throw error;
    }
  }

  throw new Error("Failed to create patient record");
}
