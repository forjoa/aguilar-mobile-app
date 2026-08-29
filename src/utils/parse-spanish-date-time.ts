const DATE_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const TIME_PATTERN = /^(\d{1,2}):(\d{2})$/;

/**
 * Parses a "DD/MM/AAAA" date and an "HH:MM" time (as typed in the "Crear
 * plan" form) into a `Date`, or `null` when either input is malformed or
 * doesn't correspond to a real date (e.g. 31/02, hour 25).
 */
export function parseSpanishDateTime(dateText: string, timeText: string): Date | null {
  const dateMatch = DATE_PATTERN.exec(dateText.trim());
  const timeMatch = TIME_PATTERN.exec(timeText.trim());

  if (!dateMatch || !timeMatch) {
    return null;
  }

  const day = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const year = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);

  if (month < 1 || month > 12 || hour > 23 || minute > 59) {
    return null;
  }

  const date = new Date(year, month - 1, day, hour, minute);

  // Reject overflowed dates (e.g. 31/02 silently rolls into early March).
  if (date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}
