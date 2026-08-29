// Mock data — Poll. Not sourced from any real API (see README, no-backend phase).
import type { Poll } from '@/types';

export const mockPolls: Poll[] = [
  {
    id: 'poll-1',
    question: '¿Dónde debería ubicarse el nuevo parque infantil?',
    active: true,
    closingDate: '2026-09-15',
    options: [
      { id: 'opt-1', text: 'Junto al polideportivo', votes: 58 },
      { id: 'opt-2', text: 'En la Plaza del Coso', votes: 34 },
      { id: 'opt-3', text: 'En el barrio de la estación', votes: 21 },
    ],
  },
  {
    id: 'poll-2',
    question: '¿Apoyas ampliar el horario de la biblioteca municipal?',
    active: false,
    closingDate: '2026-08-01',
    options: [
      { id: 'opt-4', text: 'Sí', votes: 210 },
      { id: 'opt-5', text: 'No', votes: 45 },
    ],
  },
];
