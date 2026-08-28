// Datos mock — Encuesta. No proceden de ninguna API real (ver README, fase sin backend).
import type { Encuesta } from '@/types';

export const mockEncuestas: Encuesta[] = [
  {
    id: 'enc-1',
    pregunta: '¿Dónde debería ubicarse el nuevo parque infantil?',
    activa: true,
    fechaCierre: '2026-09-15',
    opciones: [
      { id: 'op-1', texto: 'Junto al polideportivo', votos: 58 },
      { id: 'op-2', texto: 'En la Plaza del Coso', votos: 34 },
      { id: 'op-3', texto: 'En el barrio de la estación', votos: 21 },
    ],
  },
  {
    id: 'enc-2',
    pregunta: '¿Apoyas ampliar el horario de la biblioteca municipal?',
    activa: false,
    fechaCierre: '2026-08-01',
    opciones: [
      { id: 'op-4', texto: 'Sí', votos: 210 },
      { id: 'op-5', texto: 'No', votos: 45 },
    ],
  },
];
