export function normalizePhone(value: string) {
  return value.replace(/[\s-]/g, "");
}

export function isValidEmail(value: string) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isValidIndianPhone(value: string) {
  const phone = normalizePhone(value.trim());
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(phone);
}
