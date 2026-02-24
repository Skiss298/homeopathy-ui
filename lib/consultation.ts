type ConsultationMessageInput = {
  name?: string;
  appointmentLabel?: string;
  bookingId?: string;
};

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeWhatsappNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.length >= 11 && digits.length <= 15) return digits;
  return null;
}

function normalizeLink(value: string) {
  const clean = value.trim();
  if (!clean) return null;
  if (/^https?:\/\//i.test(clean)) return clean;
  return `https://${clean}`;
}

export function getGoogleMeetLink() {
  return normalizeLink(process.env.GOOGLE_MEET_LINK ?? process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK ?? "");
}

export function getClinicWhatsappNumber() {
  return normalizeWhatsappNumber(
    process.env.CLINIC_WHATSAPP_NUMBER ?? process.env.NEXT_PUBLIC_CLINIC_WHATSAPP_NUMBER ?? ""
  );
}

export function getClinicWhatsappUrl(message: string) {
  const number = getClinicWhatsappNumber();
  if (!number) return null;
  const text = normalizeWhitespace(message);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildClinicWhatsappMessage({
  name,
  appointmentLabel,
  bookingId,
}: ConsultationMessageInput) {
  const messageParts = [
    "Hello Sai Jagruthi Homeopathy Clinic,",
    `This is ${name ? normalizeWhitespace(name) : "a patient"}.`,
  ];

  if (appointmentLabel) {
    messageParts.push(`My consultation is booked for ${normalizeWhitespace(appointmentLabel)} IST.`);
  }
  if (bookingId) {
    messageParts.push(`Booking ID: ${normalizeWhitespace(bookingId)}.`);
  }

  messageParts.push("Please share/confirm my Google Meet consultation link.");
  return messageParts.join(" ");
}
