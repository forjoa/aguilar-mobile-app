// Mock data — CivicPoints. Not sourced from any real API (see README, no-backend phase).
import type { CivicPoints } from '@/types';

export const mockCivicPoints: CivicPoints[] = [
  {
    userId: 'usr-1',
    // Net of the history below (120 earned - 25 spent on the coupon
    // already redeemed in mocks/redeemed-coupons.ts).
    totalPoints: 95,
    history: [
      { reason: 'Reportar incidencia resuelta', points: 20, date: '2026-08-15' },
      { reason: 'Participar en plan de Comunidad', points: 50, date: '2026-08-20' },
      { reason: 'Canjeaste: Caña gratis con tu tapa', points: -25, date: '2026-08-21' },
      { reason: 'Reportar incidencia resuelta', points: 50, date: '2026-08-25' },
    ],
  },
  {
    userId: 'usr-2',
    totalPoints: 30,
    history: [{ reason: 'Participar en plan de Comunidad', points: 30, date: '2026-08-22' }],
  },
];
