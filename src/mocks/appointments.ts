// Mock data — Appointment. Not sourced from any real API (see README, no-backend phase).
import type { Appointment } from '@/types';

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    procedure: 'Empadronamiento',
    date: '2026-09-03',
    time: '10:30',
    applicantName: 'Marta Ruiz',
    applicantContact: '600 111 222',
    status: 'confirmed',
  },
  {
    id: 'apt-2',
    procedure: 'Licencia de obras',
    date: '2026-09-08',
    time: '12:00',
    applicantName: 'Antonio Gómez',
    applicantContact: 'antonio.gomez@example.com',
    status: 'confirmed',
  },
  {
    id: 'apt-3',
    procedure: 'Información general',
    date: '2026-08-31',
    time: '09:15',
    applicantName: 'Lucía Fernández',
    applicantContact: '600 333 444',
    status: 'cancelled',
  },
];
