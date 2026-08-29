/**
 * Initials for an Avatar's photo-less fallback: first letter of the first
 * name and first letter of the last surname (or just the first one if
 * there's a single word). Tolerates extra whitespace and empty strings.
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);

  return `${first}${last}`.toUpperCase();
}
