import { formatDate, formatDateTime, formatRelativeDay, formatTime } from '@/utils/format-date';

describe('formatDate', () => {
  it('formats a full ISO date in long Spanish form', () => {
    expect(formatDate('2026-09-05T20:00:00')).toBe('5 de septiembre de 2026');
  });
});

describe('formatTime', () => {
  it('formats the time in 24h HH:mm', () => {
    expect(formatTime('2026-09-05T20:00:00')).toBe('20:00');
  });
});

describe('formatDateTime', () => {
  it('combines the long date and the time', () => {
    expect(formatDateTime('2026-09-05T20:00:00')).toBe('5 de septiembre de 2026, 20:00');
  });
});

describe('formatRelativeDay', () => {
  const now = new Date('2026-08-28T12:00:00');

  it('returns "Hoy" for the same calendar day, regardless of the time', () => {
    expect(formatRelativeDay('2026-08-28T09:00:00', now)).toBe('Hoy');
    expect(formatRelativeDay('2026-08-28T23:59:00', now)).toBe('Hoy');
  });

  it('returns "Mañana" for the next calendar day', () => {
    expect(formatRelativeDay('2026-08-29T09:00:00', now)).toBe('Mañana');
  });

  it('returns the long date for any other day', () => {
    expect(formatRelativeDay('2026-09-05T09:00:00', now)).toBe('5 de septiembre de 2026');
  });
});
