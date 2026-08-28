import { useEffect, useState } from 'react';

/**
 * Estado de carga simulado para que las pantallas muestren un `LoadingSpinner`
 * realista aunque no haya red de por medio (fase sin backend, ver README).
 * Empieza en `true` y pasa a `false` a los `delayMs` (600 ms por defecto).
 */
export function useSimulatedLoading(delayMs = 600): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  return isLoading;
}
