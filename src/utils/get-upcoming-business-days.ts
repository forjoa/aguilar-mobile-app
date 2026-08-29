const WEEKEND_DAYS = [0, 6]; // Sunday, Saturday

/**
 * The next `count` weekdays (Mon–Fri) starting tomorrow relative to `from` —
 * used to offer appointment dates without booking on a closed weekend.
 */
export function getUpcomingBusinessDays(count: number, from: Date = new Date()): Date[] {
  const days: Date[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    if (!WEEKEND_DAYS.includes(cursor.getDay())) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
