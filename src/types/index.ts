// Shared data models across modules. Each entity has its example mock in the
// matching file under `src/mocks/` (e.g. `Business` in `src/mocks/businesses.ts`).
// Defined in HAS-6 (Design system, base components and shared mocks) so every
// module issue only has to consume them, not design them from scratch.
//
// Dates are represented as ISO 8601 strings (`new Date(date)` to format them
// with the helpers in `src/utils/format-date.ts`).
//
// Field names and type identifiers are English (see AGENTS.md §2); the actual
// mock data values stay in Spanish where they are rendered as-is to the app's
// end users (a business name, an address, a description).

export type ID = string;

/** Generic app user — a plan organizer, a suggestion author, etc. */
export interface User {
  id: ID;
  name: string;
  avatarUrl?: string;
}

// --- Local business (HAS-11) -----------------------------------------------

export interface Business {
  id: ID;
  name: string;
  category: string;
  description: string;
  address: string;
  logoUrl?: string;
}

export interface Product {
  id: ID;
  businessId: ID;
  name: string;
  price: number;
  description: string;
  available: boolean;
  photoUrl?: string;
}

/** One message in a simulated product/business chat — no real messaging backend. */
export interface ChatMessage {
  id: ID;
  sender: 'user' | 'business';
  text: string;
}

/** A per-product conversation with a business, seeded with example messages. */
export interface Conversation {
  id: ID;
  businessId: ID;
  productId: ID;
  lastMessageDate: string;
  messages: ChatMessage[];
}

// --- News and events board (HAS-7) ------------------------------------------

export interface News {
  id: ID;
  title: string;
  /** Short summary shown in the list. */
  summary: string;
  /** Full body shown in the detail view. */
  body: string;
  category: string;
  publishedDate: string;
}

export interface Event {
  id: ID;
  title: string;
  description: string;
  category: string;
  startDate: string;
  location: string;
  imageUrl?: string;
  /** Simulated initial state of the "I'm interested" button in the mock. */
  interested: boolean;
}

// --- Incident map (HAS-8) ----------------------------------------------------

export type IncidentStatus = 'active' | 'resolved';
export type IncidentType = 'roadwork' | 'traffic_closure' | 'utility_fault' | 'other';

export interface Incident {
  id: ID;
  type: IncidentType;
  description: string;
  address: string;
  date: string;
  status: IncidentStatus;
  coordinates: { lat: number; lng: number };
}

// --- Community: neighbor plans (HAS-10) -------------------------------------

export interface CommunityPlan {
  id: ID;
  title: string;
  description: string;
  category: string;
  organizer: string;
  date: string;
  attendeeCount: number;
  /** Whether the neighbor viewing the mock is already joined (local toggle). */
  isJoined: boolean;
}

// --- Municipal sports facility bookings (HAS-9) -----------------------------

export type FacilityType = 'padel' | 'five_a_side_football' | 'tennis';

export interface Facility {
  id: ID;
  name: string;
  type: FacilityType;
  description: string;
  photoUrl?: string;
}

export type BookingStatus = 'confirmed' | 'cancelled';

export interface Booking {
  id: ID;
  facilityId: ID;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
}

// --- Town hall procedure appointments (HAS-12) ------------------------------

export type AppointmentStatus = 'confirmed' | 'cancelled';

export interface Appointment {
  id: ID;
  procedure: string;
  date: string;
  time: string;
  applicantName: string;
  applicantContact: string;
  status: AppointmentStatus;
}

// --- Local job board (HAS-13) -----------------------------------------------

export type JobOfferType = 'private' | 'council';

export interface JobOffer {
  id: ID;
  position: string;
  company: string;
  type: JobOfferType;
  sector: string;
  scheduleType: string;
  description: string;
  requirements: string;
  howToApply: string;
  publishedDate: string;
}

// --- On-duty pharmacy (HAS-14) -----------------------------------------------

export interface Pharmacy {
  id: ID;
  name: string;
  address: string;
  phone: string;
  regularHours: string;
}

/**
 * One day of the on-duty rotation: which pharmacy covers that day outside
 * `regularHours` (nights, Sundays…). See `getPharmacyDutySchedule`, which
 * computes this relative to today instead of a hardcoded mock so "today's"
 * pharmacy is always right whenever the app runs.
 */
export interface PharmacyDutyShift {
  date: string;
  pharmacyId: ID;
}

// --- Intercity bus schedules (HAS-15) ----------------------------------------

export interface BusLine {
  id: ID;
  origin: string;
  destination: string;
  intermediateStops: string[];
  weekdaySchedule: string[];
  weekendSchedule: string[];
}

// --- Complaints and suggestions box (HAS-16) --------------------------------

export type SuggestionStatus = 'received' | 'in_progress' | 'resolved';

export type SuggestionCategory =
  'street_lighting' | 'cleaning' | 'urban_furniture' | 'noise' | 'suggestion' | 'other';

/** One entry of a suggestion's status history — when it entered that status. */
export interface SuggestionStatusChange {
  status: SuggestionStatus;
  date: string;
}

export interface Suggestion {
  id: ID;
  referenceNumber: string;
  category: SuggestionCategory;
  description: string;
  status: SuggestionStatus;
  submittedDate: string;
  /** Whether a photo was attached — there's no real picker yet (see README), just this flag. */
  hasPhoto?: boolean;
  /** Chronological, starts with 'received' on submittedDate. */
  statusHistory: SuggestionStatusChange[];
}

// --- Polls and public consultations (HAS-17) --------------------------------

export interface PollOption {
  id: ID;
  text: string;
  votes: number;
}

export interface Poll {
  id: ID;
  question: string;
  options: PollOption[];
  active: boolean;
  closingDate: string;
}

// --- Gamification: civic points (HAS-18) ------------------------------------

export interface CivicPointsEntry {
  reason: string;
  points: number;
  date: string;
}

export interface CivicPoints {
  userId: ID;
  totalPoints: number;
  history: CivicPointsEntry[];
}
