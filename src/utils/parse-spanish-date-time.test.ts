import { parseSpanishDateTime } from '@/utils/parse-spanish-date-time';

describe('parseSpanishDateTime', () => {
  it('parses a valid date and time', () => {
    const result = parseSpanishDateTime('10/09/2026', '18:30');

    expect(result).not.toBeNull();
    expect(result?.getFullYear()).toBe(2026);
    expect(result?.getMonth()).toBe(8); // September, 0-indexed
    expect(result?.getDate()).toBe(10);
    expect(result?.getHours()).toBe(18);
    expect(result?.getMinutes()).toBe(30);
  });

  it('accepts single-digit day/month', () => {
    const result = parseSpanishDateTime('5/9/2026', '9:05');

    expect(result?.getDate()).toBe(5);
    expect(result?.getMonth()).toBe(8);
    expect(result?.getHours()).toBe(9);
  });

  it('rejects a malformed date', () => {
    expect(parseSpanishDateTime('2026-09-10', '18:30')).toBeNull();
  });

  it('rejects a malformed time', () => {
    expect(parseSpanishDateTime('10/09/2026', '6:30 pm')).toBeNull();
  });

  it('rejects an out-of-range month', () => {
    expect(parseSpanishDateTime('10/13/2026', '18:30')).toBeNull();
  });

  it('rejects an out-of-range hour', () => {
    expect(parseSpanishDateTime('10/09/2026', '25:00')).toBeNull();
  });

  it('rejects a day that overflows its month (e.g. 31 February)', () => {
    expect(parseSpanishDateTime('31/02/2026', '18:30')).toBeNull();
  });
});
