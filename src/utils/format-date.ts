// Date/time formatting helpers shared across modules. They work on a `Date`
// or a full ISO 8601 string (e.g. `event.startDate`). Fields a mock already
// stores display-ready (e.g. `appointment.time === '10:30'`) don't go through
// here — they're already in presentation format.

const LOCALE = 'es-ES';

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

/** "5 de septiembre de 2026" */
export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(toDate(value));
}

/** "20:00" (24 h, regardless of the device's regional settings). */
export function formatTime(value: string | Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(toDate(value));
}

/** "5 de septiembre de 2026, 20:00" */
export function formatDateTime(value: string | Date): string {
  return `${formatDate(value)}, ${formatTime(value)}`;
}

/** "2026-08-29" — a sortable/storable date key, not for display (see `formatDate`). */
export function toDateKey(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * "Hoy" / "Mañana" if `value` falls on those days relative to `now`, or the
 * formatted long date otherwise. `now` is injectable for tests.
 */
export function formatRelativeDay(value: string | Date, now: Date = new Date()): string {
  const date = toDate(value);

  if (isSameCalendarDay(date, now)) {
    return 'Hoy';
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (isSameCalendarDay(date, tomorrow)) {
    return 'Mañana';
  }

  return formatDate(date);
}
