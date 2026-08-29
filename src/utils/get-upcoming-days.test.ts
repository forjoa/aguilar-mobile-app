import { getUpcomingDays } from '@/utils/get-upcoming-days';

describe('getUpcomingDays', () => {
  it('starts tomorrow, never today', () => {
    const monday = new Date(2026, 7, 24); // Monday 24 Aug 2026
    const [firstDay] = getUpcomingDays(1, monday);

    expect(firstDay.getDate()).toBe(25);
  });

  it('includes weekends, unlike getUpcomingBusinessDays', () => {
    const friday = new Date(2026, 7, 28); // Friday 28 Aug 2026
    const days = getUpcomingDays(3, friday);

    expect(days.map((d) => d.getDay())).toEqual([6, 0, 1]); // Sat, Sun, Mon
  });

  it('returns the requested count of sequential days', () => {
    const days = getUpcomingDays(5, new Date(2026, 7, 24));

    expect(days).toHaveLength(5);
    expect(days.map((d) => d.getDate())).toEqual([25, 26, 27, 28, 29]);
  });
});
