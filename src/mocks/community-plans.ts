// Mock data — CommunityPlan. Not sourced from any real API (see README, no-backend phase).
import type { CommunityPlan } from '@/types';

export const mockCommunityPlans: CommunityPlan[] = [
  {
    id: 'plan-1',
    title: 'Ruta senderista a la Sierra',
    description: 'Salida en grupo, nivel medio, 12 km ida y vuelta.',
    category: 'Deporte',
    organizer: 'Club Senderista Aguilarense',
    date: '2026-09-06T08:00:00',
    attendeeCount: 14,
    isJoined: false,
  },
  {
    id: 'plan-2',
    title: 'Quedada de costura solidaria',
    description: 'Taller abierto para hacer mantas para la protectora de animales.',
    category: 'Solidaridad',
    organizer: 'Asociación de Vecinos Centro',
    date: '2026-09-10T17:30:00',
    attendeeCount: 7,
    isJoined: true,
  },
  {
    id: 'plan-3',
    title: 'Torneo de dominó entre vecinos',
    description: 'Por parejas, inscripción en el mismo plan.',
    category: 'Ocio',
    organizer: 'Hogar del Jubilado',
    date: '2026-09-14T18:00:00',
    attendeeCount: 22,
    isJoined: false,
  },
];
