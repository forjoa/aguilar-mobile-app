// Mock data — Pharmacy. Not sourced from any real API (see README, no-backend phase).
import type { Pharmacy } from '@/types';

export const mockPharmacies: Pharmacy[] = [
  {
    id: 'pha-1',
    name: 'Farmacia Ldo. Ramírez',
    address: 'Calle Real, 30',
    phone: '957 000 111',
    regularHours: 'L-V 9:00-14:00 y 17:00-20:30, S 9:00-14:00',
  },
  {
    id: 'pha-2',
    name: 'Farmacia Lda. Ortega',
    address: 'Avenida de Andalucía, 18',
    phone: '957 000 222',
    regularHours: 'L-V 9:00-14:00 y 17:00-20:30, S 9:00-14:00',
  },
  {
    id: 'pha-3',
    name: 'Farmacia Lda. Cabrera',
    address: 'Plaza del Coso, 5',
    phone: '957 000 333',
    regularHours: 'L-S 9:00-14:00 y 17:30-21:00',
  },
  {
    id: 'pha-4',
    name: 'Farmacia Ldo. Serrano',
    address: 'Calle Molino, 22',
    phone: '957 000 444',
    regularHours: 'L-V 9:30-14:00 y 17:00-20:00',
  },
];
