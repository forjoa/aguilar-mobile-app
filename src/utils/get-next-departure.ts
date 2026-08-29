import type { BusLine } from '@/types';

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function toMinutesSinceMidnight(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Next scheduled departure time (e.g. "16:45") for `line` at `now`, picking
 * the weekday or weekend schedule as appropriate. Returns `null` when there
 * are no more departures today (a real app would then show tomorrow's first
 * one, but the mock schedules don't carry enough context to justify that yet).
 */
export function getNextDeparture(line: BusLine, now: Date = new Date()): string | null {
  const schedule = isWeekend(now) ? line.weekendSchedule : line.weekdaySchedule;
  const nowInMinutes = now.getHours() * 60 + now.getMinutes();

  return schedule.find((time) => toMinutesSinceMidnight(time) > nowInMinutes) ?? null;
}
