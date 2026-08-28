// Datos mock — Incidencia. No proceden de ninguna API real (ver README, fase sin backend).
// Las coordenadas son aproximadas y ficticias, solo para maquetar marcadores.
import type { Incidencia } from '@/types';

export const mockIncidencias: Incidencia[] = [
  {
    id: 'inc-1',
    tipo: 'obra',
    descripcion: 'Renovación del asfaltado en la calle.',
    direccion: 'Calle Real, altura nº 20',
    fecha: '2026-08-20T09:00:00',
    estado: 'activa',
    coordenadas: { lat: 37.5187, lng: -4.6544 },
  },
  {
    id: 'inc-2',
    tipo: 'corte_trafico',
    descripcion: 'Corte por procesión, tráfico desviado por calles adyacentes.',
    direccion: 'Plaza de España',
    fecha: '2026-09-05T17:00:00',
    estado: 'activa',
    coordenadas: { lat: 37.5192, lng: -4.6551 },
  },
  {
    id: 'inc-3',
    tipo: 'averia',
    descripcion: 'Farola sin luz desde hace varios días.',
    direccion: 'Calle Molino, esquina con Calle Cervantes',
    fecha: '2026-08-15T21:00:00',
    estado: 'resuelta',
    coordenadas: { lat: 37.5178, lng: -4.6529 },
  },
  {
    id: 'inc-4',
    tipo: 'averia',
    descripcion: 'Fuga de agua en la acera.',
    direccion: 'Avenida de Andalucía, 45',
    fecha: '2026-08-26T08:15:00',
    estado: 'activa',
    coordenadas: { lat: 37.5203, lng: -4.6519 },
  },
];
