// Mock data — BusLine. Not sourced from any real API (see README, no-backend phase).
import type { BusLine } from '@/types';

export const mockBusLines: BusLine[] = [
  {
    id: 'bus-1',
    origin: 'Aguilar de la Frontera',
    destination: 'Córdoba',
    intermediateStops: ['Montilla', 'Fernán Núñez'],
    weekdaySchedule: ['07:15', '09:30', '13:00', '16:45', '19:30'],
    weekendSchedule: ['09:30', '19:30'],
  },
  {
    id: 'bus-2',
    origin: 'Aguilar de la Frontera',
    destination: 'Lucena',
    intermediateStops: ['Moriles'],
    weekdaySchedule: ['08:00', '14:15', '18:00'],
    weekendSchedule: ['18:00'],
  },
];
