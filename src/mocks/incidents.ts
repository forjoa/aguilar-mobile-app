// Mock data — Incident. Not sourced from any real API (see README, no-backend phase).
// Coordinates are approximate and fictional, only meant to mock up markers.
import type { Incident } from '@/types';

export const mockIncidents: Incident[] = [
  {
    id: 'inc-1',
    type: 'roadwork',
    description: 'Renovación del asfaltado en la calle.',
    address: 'Calle Real, altura nº 20',
    date: '2026-08-20T09:00:00',
    status: 'active',
    coordinates: { lat: 37.5187, lng: -4.6544 },
  },
  {
    id: 'inc-2',
    type: 'traffic_closure',
    description: 'Corte por procesión, tráfico desviado por calles adyacentes.',
    address: 'Plaza de España',
    date: '2026-09-05T17:00:00',
    status: 'active',
    coordinates: { lat: 37.5192, lng: -4.6551 },
  },
  {
    id: 'inc-3',
    type: 'utility_fault',
    description: 'Farola sin luz desde hace varios días.',
    address: 'Calle Molino, esquina con Calle Cervantes',
    date: '2026-08-15T21:00:00',
    status: 'resolved',
    coordinates: { lat: 37.5178, lng: -4.6529 },
  },
  {
    id: 'inc-4',
    type: 'utility_fault',
    description: 'Fuga de agua en la acera.',
    address: 'Avenida de Andalucía, 45',
    date: '2026-08-26T08:15:00',
    status: 'active',
    coordinates: { lat: 37.5203, lng: -4.6519 },
  },
  {
    id: 'inc-5',
    type: 'roadwork',
    description: 'Corte parcial de la calle por obras de pavimentado.',
    address: 'Calle Alcalde José González, 12',
    date: '2026-08-22T08:00:00',
    status: 'active',
    coordinates: { lat: 37.5156, lng: -4.6572 },
  },
  {
    id: 'inc-6',
    type: 'other',
    description: 'Retirada de un vehículo abandonado en la vía pública.',
    address: 'Calle Barrera, 8',
    date: '2026-08-12T10:00:00',
    status: 'resolved',
    coordinates: { lat: 37.5169, lng: -4.6538 },
  },
  {
    id: 'inc-7',
    type: 'traffic_closure',
    description: 'Corte de tráfico por la Feria de Aguilar.',
    address: 'Recinto ferial',
    date: '2026-09-12T00:00:00',
    status: 'active',
    coordinates: { lat: 37.5224, lng: -4.6502 },
  },
];
