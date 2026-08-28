// Datos mock — Cita. No proceden de ninguna API real (ver README, fase sin backend).
import type { Cita } from '@/types';

export const mockCitas: Cita[] = [
  {
    id: 'cita-1',
    tramite: 'Empadronamiento',
    fecha: '2026-09-03',
    hora: '10:30',
    solicitanteNombre: 'Marta Ruiz',
    solicitanteContacto: '600 111 222',
    estado: 'confirmada',
  },
  {
    id: 'cita-2',
    tramite: 'Licencia de obras',
    fecha: '2026-09-08',
    hora: '12:00',
    solicitanteNombre: 'Antonio Gómez',
    solicitanteContacto: 'antonio.gomez@example.com',
    estado: 'confirmada',
  },
  {
    id: 'cita-3',
    tramite: 'Información general',
    fecha: '2026-08-31',
    hora: '09:15',
    solicitanteNombre: 'Lucía Fernández',
    solicitanteContacto: '600 333 444',
    estado: 'cancelada',
  },
];
