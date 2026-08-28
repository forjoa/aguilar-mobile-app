// Datos mock — Reserva. No proceden de ninguna API real (ver README, fase sin backend).
import type { Reserva } from '@/types';

export const mockReservas: Reserva[] = [
  {
    id: 'res-1',
    instalacionId: 'inst-1',
    fecha: '2026-08-29',
    horaInicio: '18:00',
    horaFin: '19:00',
    estado: 'confirmada',
  },
  {
    id: 'res-2',
    instalacionId: 'inst-3',
    fecha: '2026-08-30',
    horaInicio: '20:00',
    horaFin: '21:00',
    estado: 'confirmada',
  },
  {
    id: 'res-3',
    instalacionId: 'inst-2',
    fecha: '2026-08-27',
    horaInicio: '10:00',
    horaFin: '11:00',
    estado: 'cancelada',
  },
];
