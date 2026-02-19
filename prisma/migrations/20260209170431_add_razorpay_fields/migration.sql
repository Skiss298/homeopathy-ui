-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT;

-- CreateIndex
CREATE INDEX "Booking_razorpayOrderId_idx" ON "Booking"("razorpayOrderId");
