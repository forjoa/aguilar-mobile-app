import { useEffect, useState } from 'react';

/**
 * Simulated loading state so screens show a realistic `LoadingSpinner` even
 * though there's no network involved (no-backend phase, see README). Starts
 * as `true` and flips to `false` after `delayMs` (600 ms by default).
 */
export function useSimulatedLoading(delayMs = 600): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return isLoading;
}
