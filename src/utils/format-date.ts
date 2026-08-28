// Utilidades de formateo de fechas/horas compartidas por los módulos. Trabajan
// sobre `Date` o strings ISO 8601 completos (p. ej. `evento.fechaInicio`).
// Los campos que un mock ya guarda listos para mostrarse (p. ej.
// `cita.hora === '10:30'`) no pasan por aquí — ya están en formato de
// presentación.

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

/** "20:00" (24 h, independientemente de la configuración regional del dispositivo). */
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

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * "Hoy" / "Mañana" si `value` cae en esos días respecto a `now`, o la fecha
 * larga formateada en cualquier otro caso. `now` es inyectable para tests.
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
