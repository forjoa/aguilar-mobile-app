/**
 * The next `count` calendar days (every day, weekends included) starting
 * tomorrow relative to `from` — used to offer booking dates for a facility
 * that's open daily. See `getUpcomingBusinessDays` for the Mon–Fri variant
 * used by the town hall appointments module.
 */
export function getUpcomingDays(count: number, from: Date = new Date()): Date[] {
  const days: Date[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  for (let i = 0; i < count; i += 1) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
