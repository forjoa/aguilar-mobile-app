// Datos mock — OfertaEmpleo. No proceden de ninguna API real (ver README, fase sin backend).
import type { OfertaEmpleo } from '@/types';

export const mockOfertasEmpleo: OfertaEmpleo[] = [
  {
    id: 'ofer-1',
    puesto: 'Dependiente/a de panadería',
    entidad: 'Panadería El Trigal',
    tipo: 'privado',
    sector: 'Comercio',
    tipoJornada: 'Jornada completa',
    descripcion: 'Atención al público, reposición y cierre de caja.',
    requisitos: 'Disponibilidad de mañanas y experiencia previa valorable.',
    comoInscribirse: 'Enviar CV a empleo@eltrigal.example.com',
    fechaPublicacion: '2026-08-20',
  },
  {
    id: 'ofer-2',
    puesto: 'Socorrista piscina municipal',
    entidad: 'Ayuntamiento de Aguilar de la Frontera',
    tipo: 'ayuntamiento',
    sector: 'Deporte',
    tipoJornada: 'Jornada parcial (temporada de verano)',
    descripcion: 'Vigilancia y seguridad en la piscina municipal.',
    requisitos: 'Título de socorrismo en vigor.',
    comoInscribirse: 'Instancia en el registro del Ayuntamiento.',
    fechaPublicacion: '2026-08-10',
  },
  {
    id: 'ofer-3',
    puesto: 'Administrativo/a',
    entidad: 'Ferretería Sánchez',
    tipo: 'privado',
    sector: 'Comercio',
    tipoJornada: 'Media jornada',
    descripcion: 'Gestión de pedidos, facturación y atención telefónica.',
    requisitos: 'Manejo de hojas de cálculo y buena comunicación.',
    comoInscribirse: 'Presentar CV en tienda, Calle Cervantes 4.',
    fechaPublicacion: '2026-08-24',
  },
];
