import { getUpcomingBusinessDays } from '@/utils/get-upcoming-business-days';

describe('getUpcomingBusinessDays', () => {
  it('skips the weekend right after a Friday', () => {
    const friday = new Date(2026, 7, 28); // Friday 28 Aug 2026
    const days = getUpcomingBusinessDays(3, friday);

    expect(days.map((d) => d.getDay())).toEqual([1, 2, 3]); // Mon, Tue, Wed
  });

  it('skips a weekend that falls in the middle of the range', () => {
    const wednesday = new Date(2026, 7, 26); // Wednesday 26 Aug 2026
    const days = getUpcomingBusinessDays(4, wednesday);

    // Thu, Fri, then skip Sat/Sun, then Mon, Tue
    expect(days.map((d) => d.getDay())).toEqual([4, 5, 1, 2]);
  });

  it('starts tomorrow, never today', () => {
    const monday = new Date(2026, 7, 24); // Monday 24 Aug 2026
    const [firstDay] = getUpcomingBusinessDays(1, monday);

    expect(firstDay.getDate()).toBe(25);
  });

  it('returns the requested count', () => {
    expect(getUpcomingBusinessDays(6)).toHaveLength(6);
  });
});
