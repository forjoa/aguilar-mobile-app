import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A message that shows and auto-clears after `durationMs` — e.g. a transient
 * "+10 puntos" confirmation next to an action button. Showing a new message
 * while one is already visible restarts the timer instead of stacking them.
 */
export function useTimedMessage(durationMs = 2000): [string | null, (message: string) => void] {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showMessage = useCallback(
    (next: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setMessage(next);
      timeoutRef.current = setTimeout(() => setMessage(null), durationMs);
    },
    [durationMs],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return [message, showMessage];
}
