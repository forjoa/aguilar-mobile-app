// Datos mock — PlanComunidad. No proceden de ninguna API real (ver README, fase sin backend).
import type { PlanComunidad } from '@/types';

export const mockPlanesComunidad: PlanComunidad[] = [
  {
    id: 'plan-1',
    titulo: 'Ruta senderista a la Sierra',
    descripcion: 'Salida en grupo, nivel medio, 12 km ida y vuelta.',
    categoria: 'Deporte',
    organizador: 'Club Senderista Aguilarense',
    fecha: '2026-09-06T08:00:00',
    apuntados: 14,
    estoyApuntado: false,
  },
  {
    id: 'plan-2',
    titulo: 'Quedada de costura solidaria',
    descripcion: 'Taller abierto para hacer mantas para la protectora de animales.',
    categoria: 'Solidaridad',
    organizador: 'Asociación de Vecinos Centro',
    fecha: '2026-09-10T17:30:00',
    apuntados: 7,
    estoyApuntado: true,
  },
  {
    id: 'plan-3',
    titulo: 'Torneo de dominó entre vecinos',
    descripcion: 'Por parejas, inscripción en el mismo plan.',
    categoria: 'Ocio',
    organizador: 'Hogar del Jubilado',
    fecha: '2026-09-14T18:00:00',
    apuntados: 22,
    estoyApuntado: false,
  },
];
