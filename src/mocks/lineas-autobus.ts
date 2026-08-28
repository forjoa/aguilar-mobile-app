// Datos mock — LineaAutobus. No proceden de ninguna API real (ver README, fase sin backend).
import type { LineaAutobus } from '@/types';

export const mockLineasAutobus: LineaAutobus[] = [
  {
    id: 'bus-1',
    origen: 'Aguilar de la Frontera',
    destino: 'Córdoba',
    paradasIntermedias: ['Montilla', 'Fernán Núñez'],
    horariosLaborables: ['07:15', '09:30', '13:00', '16:45', '19:30'],
    horariosFestivos: ['09:30', '19:30'],
  },
  {
    id: 'bus-2',
    origen: 'Aguilar de la Frontera',
    destino: 'Lucena',
    paradasIntermedias: ['Moriles'],
    horariosLaborables: ['08:00', '14:15', '18:00'],
    horariosFestivos: ['18:00'],
  },
];
