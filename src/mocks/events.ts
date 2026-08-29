// Mock data — Event. Not sourced from any real API (see README, no-backend phase).
import type { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Feria de la Tapa',
    description: 'Ruta de tapas por los bares del pueblo con precio único.',
    category: 'Cultura',
    startDate: '2026-09-05T20:00:00',
    location: 'Plaza de España',
    interested: false,
  },
  {
    id: 'evt-2',
    title: 'Torneo local de fútbol sala',
    description: 'Fase final del torneo de verano, entrada libre.',
    category: 'Deporte',
    startDate: '2026-09-12T18:30:00',
    location: 'Polideportivo municipal',
    interested: true,
  },
  {
    id: 'evt-3',
    title: 'Pleno municipal ordinario',
    description: 'Sesión ordinaria del Ayuntamiento, abierta al público.',
    category: 'Institucional',
    startDate: '2026-09-02T19:00:00',
    location: 'Salón de Plenos del Ayuntamiento',
    interested: false,
  },
  {
    id: 'evt-4',
    title: 'Cine de verano al aire libre',
    description: 'Proyección familiar en la Plaza del Coso.',
    category: 'Cultura',
    startDate: '2026-08-30T21:30:00',
    location: 'Plaza del Coso',
    interested: false,
  },
];
