export type Coordinates = { lat: number; lng: number };

export type BoundingBox = { minLat: number; maxLat: number; minLng: number; maxLng: number };

/**
 * Bounding box around `points`, padded by `paddingRatio` on each side so
 * edge markers don't sit flush against the container's border.
 */
export function getBoundingBox(points: Coordinates[], paddingRatio = 0.15): BoundingBox {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;
  // A single point (zero-size range) still needs *some* padding, regardless
  // of paddingRatio, or every projection would collapse onto one exact spot.
  const latPadding = latRange === 0 ? 0.001 : latRange * paddingRatio;
  const lngPadding = lngRange === 0 ? 0.001 : lngRange * paddingRatio;

  return {
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
    minLng: minLng - lngPadding,
    maxLng: maxLng + lngPadding,
  };
}

/**
 * Projects `point` onto a `{ leftPercent, topPercent }` position within
 * `box` — a lightweight stand-in for real map projection since this screen
 * has no map library integrated (see `MapBackground`). Latitude is inverted
 * (north is up), and a degenerate (zero-size) box centers the point.
 */
export function projectToPercent(
  point: Coordinates,
  box: BoundingBox,
): { leftPercent: number; topPercent: number } {
  const lngRange = box.maxLng - box.minLng;
  const latRange = box.maxLat - box.minLat;

  const leftPercent = lngRange === 0 ? 50 : ((point.lng - box.minLng) / lngRange) * 100;
  const topPercent = latRange === 0 ? 50 : ((box.maxLat - point.lat) / latRange) * 100;

  return { leftPercent, topPercent };
}
