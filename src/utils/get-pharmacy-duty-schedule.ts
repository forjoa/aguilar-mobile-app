import type { ID, PharmacyDutyShift } from '@/types';

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Round-robin on-duty rotation, one pharmacy per day, starting today
 * (inclusive) and cycling through `pharmacyIds` in order. Computed relative
 * to `from` (defaults to now) instead of a hardcoded mock calendar, so
 * "today's" on-duty pharmacy is always right whenever the app actually runs.
 */
export function getPharmacyDutySchedule(
  pharmacyIds: ID[],
  days: number,
  from: Date = new Date(),
): PharmacyDutyShift[] {
  if (pharmacyIds.length === 0) {
    return [];
  }

  const schedule: PharmacyDutyShift[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i += 1) {
    schedule.push({
      date: toDateKey(cursor),
      pharmacyId: pharmacyIds[i % pharmacyIds.length],
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return schedule;
}
