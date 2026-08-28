/**
 * Iniciales para el fallback de un Avatar sin foto: primera letra del primer
 * nombre y primera letra del último apellido (o solo la primera si hay una
 * única palabra). Tolera espacios extra y cadenas vacías.
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
