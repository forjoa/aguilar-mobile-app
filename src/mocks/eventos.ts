// Datos mock — Evento. No proceden de ninguna API real (ver README, fase sin backend).
import type { Evento } from '@/types';

export const mockEventos: Evento[] = [
  {
    id: 'evt-1',
    titulo: 'Feria de la Tapa',
    descripcion: 'Ruta de tapas por los bares del pueblo con precio único.',
    categoria: 'Cultura',
    fechaInicio: '2026-09-05T20:00:00',
    lugar: 'Plaza de España',
    meInteresa: false,
  },
  {
    id: 'evt-2',
    titulo: 'Torneo local de fútbol sala',
    descripcion: 'Fase final del torneo de verano, entrada libre.',
    categoria: 'Deporte',
    fechaInicio: '2026-09-12T18:30:00',
    lugar: 'Polideportivo municipal',
    meInteresa: true,
  },
  {
    id: 'evt-3',
    titulo: 'Pleno municipal ordinario',
    descripcion: 'Sesión ordinaria del Ayuntamiento, abierta al público.',
    categoria: 'Institucional',
    fechaInicio: '2026-09-02T19:00:00',
    lugar: 'Salón de Plenos del Ayuntamiento',
    meInteresa: false,
  },
  {
    id: 'evt-4',
    titulo: 'Cine de verano al aire libre',
    descripcion: 'Proyección familiar en la Plaza del Coso.',
    categoria: 'Cultura',
    fechaInicio: '2026-08-30T21:30:00',
    lugar: 'Plaza del Coso',
    meInteresa: false,
  },
];
