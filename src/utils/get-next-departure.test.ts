import { getNextDeparture } from '@/utils/get-next-departure';

const line = {
  id: 'bus-test',
  origin: 'Aguilar de la Frontera',
  destination: 'Córdoba',
  intermediateStops: ['Montilla'],
  weekdaySchedule: ['07:15', '09:30', '13:00'],
  weekendSchedule: ['09:30'],
};

// All dates are a fixed local time on a known weekday/weekend to keep the test deterministic.
const MONDAY_MORNING = new Date(2026, 7, 24, 8, 0); // 2026-08-24 is a Monday
const MONDAY_EVENING = new Date(2026, 7, 24, 20, 0);
const SUNDAY_MORNING = new Date(2026, 7, 23, 8, 0); // 2026-08-23 is a Sunday
const SUNDAY_AFTERNOON = new Date(2026, 7, 23, 12, 0);

describe('getNextDeparture', () => {
  it('returns the next weekday departure after the current time', () => {
    expect(getNextDeparture(line, MONDAY_MORNING)).toBe('09:30');
  });

  it('returns null when every weekday departure has already left', () => {
    expect(getNextDeparture(line, MONDAY_EVENING)).toBeNull();
  });

  it('uses the weekend schedule on a Sunday', () => {
    expect(getNextDeparture(line, SUNDAY_MORNING)).toBe('09:30');
  });

  it('returns null once the weekend schedule is exhausted', () => {
    expect(getNextDeparture(line, SUNDAY_AFTERNOON)).toBeNull();
  });
});
