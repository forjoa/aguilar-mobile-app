// Modelos de datos compartidos entre módulos. Cada entidad tiene su mock de
// ejemplo en el archivo equivalente de `src/mocks/` (p. ej. `Comercio` en
// `src/mocks/comercios.ts`). Definidos en HAS-6 (Sistema de diseño, componentes
// base y mocks compartidos) para que cada issue de módulo solo tenga que
// consumirlos, no diseñarlos desde cero.
//
// Las fechas se representan como strings ISO 8601 (`new Date(fecha)` para
// formatearlas con las utilidades de `src/utils/format-date.ts`).

export type ID = string;

/** Usuario genérico de la app — organizador de un plan, autor de una sugerencia, etc. */
export interface Usuario {
  id: ID;
  nombre: string;
  avatarUrl?: string;
}

// --- Comercio local (HAS-11) ---------------------------------------------

export interface Comercio {
  id: ID;
  nombre: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  logoUrl?: string;
}

export interface Producto {
  id: ID;
  comercioId: ID;
  nombre: string;
  precio: number;
  descripcion: string;
  disponible: boolean;
  fotoUrl?: string;
}

// --- Tablón de noticias y eventos (HAS-7) ---------------------------------

export interface Evento {
  id: ID;
  titulo: string;
  descripcion: string;
  categoria: string;
  fechaInicio: string;
  lugar: string;
  imagenUrl?: string;
  /** Estado inicial simulado del botón "Me interesa" en el mock. */
  meInteresa: boolean;
}

// --- Mapa de incidencias (HAS-8) ------------------------------------------

export type EstadoIncidencia = 'activa' | 'resuelta';
export type TipoIncidencia = 'obra' | 'corte_trafico' | 'averia' | 'otro';

export interface Incidencia {
  id: ID;
  tipo: TipoIncidencia;
  descripcion: string;
  direccion: string;
  fecha: string;
  estado: EstadoIncidencia;
  coordenadas: { lat: number; lng: number };
}

// --- Comunidad: planes entre vecinos (HAS-10) -----------------------------

export interface PlanComunidad {
  id: ID;
  titulo: string;
  descripcion: string;
  categoria: string;
  organizador: string;
  fecha: string;
  apuntados: number;
  /** El vecino que ve el mock ya está apuntado o no (toggle local). */
  estoyApuntado: boolean;
}

// --- Reservas del polideportivo municipal (HAS-9) -------------------------

export type TipoInstalacion = 'padel' | 'futbol_sala' | 'tenis';

export interface Instalacion {
  id: ID;
  nombre: string;
  tipo: TipoInstalacion;
  descripcion: string;
  fotoUrl?: string;
}

export type EstadoReserva = 'confirmada' | 'cancelada';

export interface Reserva {
  id: ID;
  instalacionId: ID;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: EstadoReserva;
}

// --- Citas para trámites en el ayuntamiento (HAS-12) ----------------------

export type EstadoCita = 'confirmada' | 'cancelada';

export interface Cita {
  id: ID;
  tramite: string;
  fecha: string;
  hora: string;
  solicitanteNombre: string;
  solicitanteContacto: string;
  estado: EstadoCita;
}

// --- Bolsa de empleo local (HAS-13) ---------------------------------------

export type TipoOferta = 'privado' | 'ayuntamiento';

export interface OfertaEmpleo {
  id: ID;
  puesto: string;
  entidad: string;
  tipo: TipoOferta;
  sector: string;
  tipoJornada: string;
  descripcion: string;
  requisitos: string;
  comoInscribirse: string;
  fechaPublicacion: string;
}

// --- Farmacia de guardia (HAS-14) -----------------------------------------

export interface Farmacia {
  id: ID;
  nombre: string;
  direccion: string;
  telefono: string;
  horarioHabitual: string;
  /** Solo una farmacia del mock tiene esto a `true` para "hoy". */
  deGuardiaHoy: boolean;
  proximoTurno?: string;
}

// --- Horarios de autobús interurbano (HAS-15) -----------------------------

export interface LineaAutobus {
  id: ID;
  origen: string;
  destino: string;
  paradasIntermedias: string[];
  horariosLaborables: string[];
  horariosFestivos: string[];
}

// --- Buzón de quejas y sugerencias (HAS-16) -------------------------------

export type EstadoSugerencia = 'recibido' | 'en_proceso' | 'resuelto';

export interface Sugerencia {
  id: ID;
  numeroReferencia: string;
  categoria: string;
  descripcion: string;
  estado: EstadoSugerencia;
  fechaEnvio: string;
  fotoUrl?: string;
}

// --- Encuestas y consultas populares (HAS-17) -----------------------------

export interface OpcionEncuesta {
  id: ID;
  texto: string;
  votos: number;
}

export interface Encuesta {
  id: ID;
  pregunta: string;
  opciones: OpcionEncuesta[];
  activa: boolean;
  fechaCierre: string;
}

// --- Gamificación: puntos por civismo (HAS-18) ----------------------------

export interface MovimientoPuntosCivicos {
  motivo: string;
  puntos: number;
  fecha: string;
}

export interface PuntosCivicos {
  usuarioId: ID;
  totalPuntos: number;
  historial: MovimientoPuntosCivicos[];
}
