// Mock data — JobOffer. Not sourced from any real API (see README, no-backend phase).
import type { JobOffer } from '@/types';

export const mockJobOffers: JobOffer[] = [
  {
    id: 'job-1',
    position: 'Dependiente/a de panadería',
    company: 'Panadería El Trigal',
    type: 'private',
    sector: 'Comercio',
    scheduleType: 'Jornada completa',
    description: 'Atención al público, reposición y cierre de caja.',
    requirements: 'Disponibilidad de mañanas y experiencia previa valorable.',
    howToApply: 'Enviar CV a empleo@eltrigal.example.com',
    publishedDate: '2026-08-20',
  },
  {
    id: 'job-2',
    position: 'Socorrista piscina municipal',
    company: 'Ayuntamiento de Aguilar de la Frontera',
    type: 'council',
    sector: 'Deporte',
    scheduleType: 'Jornada parcial (temporada de verano)',
    description: 'Vigilancia y seguridad en la piscina municipal.',
    requirements: 'Título de socorrismo en vigor.',
    howToApply: 'Instancia en el registro del Ayuntamiento.',
    publishedDate: '2026-08-10',
  },
  {
    id: 'job-3',
    position: 'Administrativo/a',
    company: 'Ferretería Sánchez',
    type: 'private',
    sector: 'Comercio',
    scheduleType: 'Media jornada',
    description: 'Gestión de pedidos, facturación y atención telefónica.',
    requirements: 'Manejo de hojas de cálculo y buena comunicación.',
    howToApply: 'Presentar CV en tienda, Calle Cervantes 4.',
    publishedDate: '2026-08-24',
  },
];
