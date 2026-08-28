// Datos mock — Comercio. No proceden de ninguna API real (ver README, fase sin backend).
import type { Comercio } from '@/types';

export const mockComercios: Comercio[] = [
  {
    id: 'com-1',
    nombre: 'Panadería El Trigal',
    categoria: 'Alimentación',
    descripcion: 'Pan de horno de leña, bollería casera y encargos para eventos.',
    direccion: 'Calle Real, 12',
  },
  {
    id: 'com-2',
    nombre: 'Ferretería Sánchez',
    categoria: 'Hogar',
    descripcion: 'Ferretería, jardinería y menaje. Corte de llaves al momento.',
    direccion: 'Calle Cervantes, 4',
  },
  {
    id: 'com-3',
    nombre: 'Bar Los Arcos',
    categoria: 'Hostelería',
    descripcion: 'Tapas y raciones caseras. Terraza en la Plaza de España.',
    direccion: 'Plaza de España, 2',
  },
  {
    id: 'com-4',
    nombre: 'Moda Rocío',
    categoria: 'Ropa',
    descripcion: 'Ropa de mujer y complementos, con arreglos de costura.',
    direccion: 'Calle Molino, 8',
  },
];
