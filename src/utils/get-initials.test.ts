import { getInitials } from '@/utils/get-initials';

describe('getInitials', () => {
  it('returns first + last initials for a full name', () => {
    expect(getInitials('Juan Pérez')).toBe('JP');
  });

  it('returns a single initial for a one-word name', () => {
    expect(getInitials('Juan')).toBe('J');
  });

  it('uses first and last word when there are middle names', () => {
    expect(getInitials('Juan Carlos Pérez')).toBe('JP');
  });

  it('trims extra whitespace between and around words', () => {
    expect(getInitials('  juan   perez  ')).toBe('JP');
  });

  it('returns an empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
