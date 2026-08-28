// Datos mock — Producto. No proceden de ninguna API real (ver README, fase sin backend).
import type { Producto } from '@/types';

export const mockProductos: Producto[] = [
  {
    id: 'prod-1',
    comercioId: 'com-1',
    nombre: 'Pan de pueblo (barra grande)',
    precio: 1.5,
    descripcion: 'Horneado cada mañana, masa madre.',
    disponible: true,
  },
  {
    id: 'prod-2',
    comercioId: 'com-1',
    nombre: 'Tarta de encargo (8 raciones)',
    precio: 18,
    descripcion: 'A elegir entre chocolate, nata o frutas. Pedido con 48h de antelación.',
    disponible: true,
  },
  {
    id: 'prod-3',
    comercioId: 'com-2',
    nombre: 'Juego de destornilladores (6 piezas)',
    precio: 12.9,
    descripcion: 'Puntas planas y de estrella, mango antideslizante.',
    disponible: true,
  },
  {
    id: 'prod-4',
    comercioId: 'com-4',
    nombre: 'Vestido de verano',
    precio: 24.95,
    descripcion: 'Tallas S a XL, disponible en tres colores.',
    disponible: false,
  },
];
