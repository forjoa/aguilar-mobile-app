import { getPharmacyDutySchedule } from '@/utils/get-pharmacy-duty-schedule';

describe('getPharmacyDutySchedule', () => {
  it('starts today, not tomorrow', () => {
    const today = new Date(2026, 7, 29); // Saturday 29 Aug 2026
    const [first] = getPharmacyDutySchedule(['pha-1', 'pha-2'], 1, today);

    expect(first.date).toBe('2026-08-29');
  });

  it('cycles through the pharmacies round-robin', () => {
    const today = new Date(2026, 7, 29);
    const schedule = getPharmacyDutySchedule(['pha-1', 'pha-2', 'pha-3'], 7, today);

    expect(schedule.map((shift) => shift.pharmacyId)).toEqual([
      'pha-1',
      'pha-2',
      'pha-3',
      'pha-1',
      'pha-2',
      'pha-3',
      'pha-1',
    ]);
  });

  it('returns the requested number of sequential days', () => {
    const schedule = getPharmacyDutySchedule(['pha-1'], 21, new Date(2026, 7, 29));

    expect(schedule).toHaveLength(21);
    expect(schedule[20].date).toBe('2026-09-18');
  });

  it('returns an empty schedule when there are no pharmacies', () => {
    expect(getPharmacyDutySchedule([], 5)).toEqual([]);
  });
});
