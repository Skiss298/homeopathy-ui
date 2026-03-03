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

export function parseAndValidateAge(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 120) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (!/^\d{1,3}$/.test(trimmed)) return null;
    const parsed = Number.parseInt(trimmed, 10);
    if (parsed >= 0 && parsed <= 120) return parsed;
  }

  return null;
}

export function normalizeIndianPhoneCanonical(value: string) {
  const digits = value.replace(/\D/g, "");

  if (/^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }

  if (/^0[6-9]\d{9}$/.test(digits)) {
    return `+91${digits.slice(1)}`;
  }

  if (/^91[6-9]\d{9}$/.test(digits)) {
    return `+${digits}`;
  }

  return null;
}
