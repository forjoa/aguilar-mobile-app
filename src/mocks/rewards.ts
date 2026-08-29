// Mock data — Reward. Not sourced from any real API (see README, no-backend phase).
// Uses the businesses already mocked in HAS-11 (src/mocks/businesses.ts) as its catalog.
import type { Reward } from '@/types';

export const mockRewards: Reward[] = [
  {
    id: 'rwd-1',
    businessId: 'biz-1',
    title: '10% de descuento en tu próxima compra',
    type: 'discount',
    costPoints: 40,
  },
  {
    id: 'rwd-2',
    businessId: 'biz-2',
    title: 'Corte de llave gratis',
    type: 'free_product',
    costPoints: 30,
  },
  {
    id: 'rwd-3',
    businessId: 'biz-3',
    title: 'Caña gratis con tu tapa',
    type: 'free_product',
    costPoints: 25,
  },
  {
    id: 'rwd-4',
    businessId: 'biz-4',
    title: '15% de descuento en un artículo',
    // Intentionally pricier than the current mock balance allows, to also
    // show the "no te llega" disabled state in the demo.
    type: 'discount',
    costPoints: 150,
  },
];
