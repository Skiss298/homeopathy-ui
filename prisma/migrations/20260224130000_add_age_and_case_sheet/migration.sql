-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "age" INTEGER;

-- CreateTable
CREATE TABLE "CaseSheet" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "caseSummary" TEXT,
    "medicationPlan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseSheet_bookingId_key" ON "CaseSheet"("bookingId");

-- CreateIndex
CREATE INDEX "CaseSheet_updatedAt_idx" ON "CaseSheet"("updatedAt");

-- AddForeignKey
ALTER TABLE "CaseSheet" ADD CONSTRAINT "CaseSheet_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
