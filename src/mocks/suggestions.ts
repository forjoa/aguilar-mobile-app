// Mock data — Suggestion. Not sourced from any real API (see README, no-backend phase).
import type { Suggestion } from '@/types';

export const mockSuggestions: Suggestion[] = [
  {
    id: 'sug-1',
    referenceNumber: 'REF-2026-0142',
    category: 'Alumbrado',
    description: 'Farola apagada en Calle Molino desde hace una semana.',
    status: 'in_progress',
    submittedDate: '2026-08-20',
    statusHistory: [
      { status: 'received', date: '2026-08-20' },
      { status: 'in_progress', date: '2026-08-22' },
    ],
  },
  {
    id: 'sug-2',
    referenceNumber: 'REF-2026-0139',
    category: 'Limpieza',
    description: 'Contenedor de basura desbordado en Plaza del Coso.',
    status: 'resolved',
    submittedDate: '2026-08-12',
    statusHistory: [
      { status: 'received', date: '2026-08-12' },
      { status: 'in_progress', date: '2026-08-14' },
      { status: 'resolved', date: '2026-08-18' },
    ],
  },
  {
    id: 'sug-3',
    referenceNumber: 'REF-2026-0150',
    category: 'Sugerencia',
    description: 'Sería útil un carril bici hacia el polideportivo.',
    status: 'received',
    submittedDate: '2026-08-26',
    statusHistory: [{ status: 'received', date: '2026-08-26' }],
  },
];
