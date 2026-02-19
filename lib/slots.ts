const IST_OFFSET_MINUTES = 5 * 60 + 30;

export type Slot = {
  startUtc: Date;
  endUtc: Date;
  label: string;
};

export function buildSlotsForDate(dateStr: string): Slot[] {
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return [];

  const slots: Slot[] = [];
  const startMinutes = 10 * 60;
  const endMinutes = 18 * 60;
  const lunchStart = 13 * 60;
  const lunchEnd = 14 * 60;

  for (let m = startMinutes; m < endMinutes; m += 30) {
    if (m >= lunchStart && m < lunchEnd) continue;
    const hour = Math.floor(m / 60);
    const minute = m % 60;
    const startUtc = new Date(
      Date.UTC(year, month - 1, day, hour, minute - IST_OFFSET_MINUTES)
    );
    const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);
    const label = formatIstLabel(hour, minute);
    slots.push({ startUtc, endUtc, label });
  }

  return slots;
}

export function formatIstLabel(hour: number, minute: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12) + 1;
  const mm = minute.toString().padStart(2, "0");
  return `${hour12}:${mm} ${suffix}`;
}
