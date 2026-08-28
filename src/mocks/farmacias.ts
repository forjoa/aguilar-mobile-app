// Datos mock — Farmacia. No proceden de ninguna API real (ver README, fase sin backend).
import type { Farmacia } from '@/types';

export const mockFarmacias: Farmacia[] = [
  {
    id: 'farm-1',
    nombre: 'Farmacia Ldo. Ramírez',
    direccion: 'Calle Real, 30',
    telefono: '957 000 111',
    horarioHabitual: 'L-V 9:00-14:00 y 17:00-20:30, S 9:00-14:00',
    deGuardiaHoy: true,
  },
  {
    id: 'farm-2',
    nombre: 'Farmacia Lda. Ortega',
    direccion: 'Avenida de Andalucía, 18',
    telefono: '957 000 222',
    horarioHabitual: 'L-V 9:00-14:00 y 17:00-20:30, S 9:00-14:00',
    deGuardiaHoy: false,
    proximoTurno: '2026-08-30',
  },
  {
    id: 'farm-3',
    nombre: 'Farmacia Lda. Cabrera',
    direccion: 'Plaza del Coso, 5',
    telefono: '957 000 333',
    horarioHabitual: 'L-S 9:00-14:00 y 17:30-21:00',
    deGuardiaHoy: false,
    proximoTurno: '2026-09-01',
  },
];
