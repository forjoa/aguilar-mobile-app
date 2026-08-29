// Mock data — CivicPoints. Not sourced from any real API (see README, no-backend phase).
import type { CivicPoints } from '@/types';

export const mockCivicPoints: CivicPoints[] = [
  {
    userId: 'usr-1',
    totalPoints: 120,
    history: [
      { reason: 'Reportar incidencia resuelta', points: 20, date: '2026-08-15' },
      { reason: 'Participar en plan de Comunidad', points: 50, date: '2026-08-20' },
      { reason: 'Reportar incidencia resuelta', points: 50, date: '2026-08-25' },
    ],
  },
  {
    userId: 'usr-2',
    totalPoints: 30,
    history: [{ reason: 'Participar en plan de Comunidad', points: 30, date: '2026-08-22' }],
  },
];
