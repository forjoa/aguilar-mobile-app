// Mock data — Business. Not sourced from any real API (see README, no-backend phase).
import type { Business } from '@/types';

export const mockBusinesses: Business[] = [
  {
    id: 'biz-1',
    name: 'Panadería El Trigal',
    category: 'Alimentación',
    description: 'Pan de horno de leña, bollería casera y encargos para eventos.',
    address: 'Calle Real, 12',
  },
  {
    id: 'biz-2',
    name: 'Ferretería Sánchez',
    category: 'Hogar',
    description: 'Ferretería, jardinería y menaje. Corte de llaves al momento.',
    address: 'Calle Cervantes, 4',
  },
  {
    id: 'biz-3',
    name: 'Bar Los Arcos',
    category: 'Hostelería',
    description: 'Tapas y raciones caseras. Terraza en la Plaza de España.',
    address: 'Plaza de España, 2',
  },
  {
    id: 'biz-4',
    name: 'Moda Rocío',
    category: 'Ropa',
    description: 'Ropa de mujer y complementos, con arreglos de costura.',
    address: 'Calle Molino, 8',
  },
  {
    id: 'biz-5',
    name: 'Peluquería Diana',
    category: 'Servicios',
    description: 'Peluquería unisex, coloración y tratamientos capilares.',
    address: 'Avenida de Andalucía, 22',
  },
  {
    id: 'biz-6',
    name: 'Electrónica Pascual',
    category: 'Tecnología',
    description: 'Accesorios de electrónica y reparación de móviles.',
    address: 'Calle Cervantes, 15',
  },
];
