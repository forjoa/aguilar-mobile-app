// Mock data — Product. Not sourced from any real API (see README, no-backend phase).
import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    businessId: 'biz-1',
    name: 'Pan de pueblo (barra grande)',
    price: 1.5,
    description: 'Horneado cada mañana, masa madre.',
    available: true,
  },
  {
    id: 'prod-2',
    businessId: 'biz-1',
    name: 'Tarta de encargo (8 raciones)',
    price: 18,
    description: 'A elegir entre chocolate, nata o frutas. Pedido con 48h de antelación.',
    available: true,
  },
  {
    id: 'prod-3',
    businessId: 'biz-2',
    name: 'Juego de destornilladores (6 piezas)',
    price: 12.9,
    description: 'Puntas planas y de estrella, mango antideslizante.',
    available: true,
  },
  {
    id: 'prod-4',
    businessId: 'biz-4',
    name: 'Vestido de verano',
    price: 24.95,
    description: 'Tallas S a XL, disponible en tres colores.',
    available: false,
  },
];
