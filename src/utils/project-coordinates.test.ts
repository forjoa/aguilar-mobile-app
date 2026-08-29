import { getBoundingBox, projectToPercent } from '@/utils/project-coordinates';

describe('getBoundingBox', () => {
  it('spans exactly the given points before padding', () => {
    const box = getBoundingBox(
      [
        { lat: 37.51, lng: -4.66 },
        { lat: 37.52, lng: -4.65 },
      ],
      0,
    );

    expect(box).toEqual({ minLat: 37.51, maxLat: 37.52, minLng: -4.66, maxLng: -4.65 });
  });

  it('pads the box proportionally to its size', () => {
    const box = getBoundingBox(
      [
        { lat: 37.5, lng: -4.6 },
        { lat: 37.6, lng: -4.5 },
      ],
      0.1,
    );

    expect(box.minLat).toBeCloseTo(37.49);
    expect(box.maxLat).toBeCloseTo(37.61);
    expect(box.minLng).toBeCloseTo(-4.61);
    expect(box.maxLng).toBeCloseTo(-4.49);
  });

  it('falls back to a small non-zero padding for a single point', () => {
    const box = getBoundingBox([{ lat: 37.5, lng: -4.6 }]);

    expect(box.minLat).toBeLessThan(37.5);
    expect(box.maxLat).toBeGreaterThan(37.5);
    expect(box.minLng).toBeLessThan(-4.6);
    expect(box.maxLng).toBeGreaterThan(-4.6);
  });
});

describe('projectToPercent', () => {
  const box = { minLat: 37.5, maxLat: 37.52, minLng: -4.66, maxLng: -4.64 };

  it('places the north-west corner at (0%, 0%)', () => {
    expect(projectToPercent({ lat: 37.52, lng: -4.66 }, box)).toEqual({
      leftPercent: 0,
      topPercent: 0,
    });
  });

  it('places the south-east corner at (100%, 100%)', () => {
    expect(projectToPercent({ lat: 37.5, lng: -4.64 }, box)).toEqual({
      leftPercent: 100,
      topPercent: 100,
    });
  });

  it('places the center at (50%, 50%)', () => {
    const { leftPercent, topPercent } = projectToPercent({ lat: 37.51, lng: -4.65 }, box);

    expect(leftPercent).toBeCloseTo(50);
    expect(topPercent).toBeCloseTo(50);
  });

  it('centers the point when the box has zero size', () => {
    const degenerateBox = { minLat: 37.5, maxLat: 37.5, minLng: -4.6, maxLng: -4.6 };

    expect(projectToPercent({ lat: 37.5, lng: -4.6 }, degenerateBox)).toEqual({
      leftPercent: 50,
      topPercent: 50,
    });
  });
});
