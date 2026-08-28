// Datos mock — Sugerencia. No proceden de ninguna API real (ver README, fase sin backend).
import type { Sugerencia } from '@/types';

export const mockSugerencias: Sugerencia[] = [
  {
    id: 'sug-1',
    numeroReferencia: 'REF-2026-0142',
    categoria: 'Alumbrado',
    descripcion: 'Farola apagada en Calle Molino desde hace una semana.',
    estado: 'en_proceso',
    fechaEnvio: '2026-08-20',
  },
  {
    id: 'sug-2',
    numeroReferencia: 'REF-2026-0139',
    categoria: 'Limpieza',
    descripcion: 'Contenedor de basura desbordado en Plaza del Coso.',
    estado: 'resuelto',
    fechaEnvio: '2026-08-12',
  },
  {
    id: 'sug-3',
    numeroReferencia: 'REF-2026-0150',
    categoria: 'Sugerencia',
    descripcion: 'Sería útil un carril bici hacia el polideportivo.',
    estado: 'recibido',
    fechaEnvio: '2026-08-26',
  },
];
