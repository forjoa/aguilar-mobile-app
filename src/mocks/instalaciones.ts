// Datos mock — Instalacion. No proceden de ninguna API real (ver README, fase sin backend).
import type { Instalacion } from '@/types';

export const mockInstalaciones: Instalacion[] = [
  {
    id: 'inst-1',
    nombre: 'Pista de pádel 1',
    tipo: 'padel',
    descripcion: 'Pista cubierta con césped artificial.',
  },
  {
    id: 'inst-2',
    nombre: 'Pista de pádel 2',
    tipo: 'padel',
    descripcion: 'Pista descubierta, iluminación nocturna.',
  },
  {
    id: 'inst-3',
    nombre: 'Fútbol sala municipal',
    tipo: 'futbol_sala',
    descripcion: 'Pista reglamentaria, vestuarios incluidos.',
  },
  {
    id: 'inst-4',
    nombre: 'Pista de tenis',
    tipo: 'tenis',
    descripcion: 'Superficie de tierra batida.',
  },
];
