import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockCivicPoints } from '@/mocks/civic-points';
import type { CivicPoints, CivicPointsEntry } from '@/types';

// Single demo user throughout the app — there's no login/account switching
// yet (no-backend phase, see README), so this mirrors whichever screens
// already assume "the current neighbor" (e.g. Community's `isJoined`).
const CURRENT_USER_ID = 'usr-1';

function getInitialPoints(): CivicPoints {
  return (
    mockCivicPoints.find((entry) => entry.userId === CURRENT_USER_ID) ?? {
      userId: CURRENT_USER_ID,
      totalPoints: 0,
      history: [],
    }
  );
}

interface CivicPointsContextValue {
  totalPoints: number;
  history: CivicPointsEntry[];
  /** Positive to earn, negative to spend (e.g. redeeming a reward). */
  addPoints: (reason: string, points: number) => void;
}

const CivicPointsContext = createContext<CivicPointsContextValue | null>(null);

/**
 * Shares the civic points balance/history across tabs (Incidencias,
 * Comunidad, Gamificación) so earning points in one screen shows up in
 * another right away. In-memory only — resets on reload, like every other
 * mock in this no-backend phase (see README).
 */
export function CivicPointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState<CivicPoints>(getInitialPoints);

  const addPoints = useCallback((reason: string, amount: number) => {
    setPoints((current) => ({
      ...current,
      totalPoints: current.totalPoints + amount,
      history: [{ reason, points: amount, date: new Date().toISOString() }, ...current.history],
    }));
  }, []);

  const value = useMemo(
    () => ({ totalPoints: points.totalPoints, history: points.history, addPoints }),
    [points, addPoints],
  );

  return <CivicPointsContext.Provider value={value}>{children}</CivicPointsContext.Provider>;
}

export function useCivicPoints(): CivicPointsContextValue {
  const context = useContext(CivicPointsContext);
  if (!context) {
    throw new Error('useCivicPoints must be used within a CivicPointsProvider');
  }
  return context;
}
