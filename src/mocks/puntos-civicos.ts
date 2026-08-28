// Datos mock — PuntosCivicos. No proceden de ninguna API real (ver README, fase sin backend).
import type { PuntosCivicos } from '@/types';

export const mockPuntosCivicos: PuntosCivicos[] = [
  {
    usuarioId: 'usr-1',
    totalPuntos: 120,
    historial: [
      { motivo: 'Reportar incidencia resuelta', puntos: 20, fecha: '2026-08-15' },
      { motivo: 'Participar en plan de Comunidad', puntos: 50, fecha: '2026-08-20' },
      { motivo: 'Reportar incidencia resuelta', puntos: 50, fecha: '2026-08-25' },
    ],
  },
  {
    usuarioId: 'usr-2',
    totalPuntos: 30,
    historial: [{ motivo: 'Participar en plan de Comunidad', puntos: 30, fecha: '2026-08-22' }],
  },
];
