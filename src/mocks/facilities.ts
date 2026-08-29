// Mock data — Facility. Not sourced from any real API (see README, no-backend phase).
import type { Facility } from '@/types';

export const mockFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'Pista de pádel 1',
    type: 'padel',
    description: 'Pista cubierta con césped artificial.',
  },
  {
    id: 'fac-2',
    name: 'Pista de pádel 2',
    type: 'padel',
    description: 'Pista descubierta, iluminación nocturna.',
  },
  {
    id: 'fac-3',
    name: 'Fútbol sala municipal',
    type: 'five_a_side_football',
    description: 'Pista reglamentaria, vestuarios incluidos.',
  },
  {
    id: 'fac-4',
    name: 'Pista de tenis',
    type: 'tennis',
    description: 'Superficie de tierra batida.',
  },
];
