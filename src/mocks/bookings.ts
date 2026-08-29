// Mock data — Booking. Not sourced from any real API (see README, no-backend phase).
import type { Booking } from '@/types';

export const mockBookings: Booking[] = [
  {
    id: 'bkg-1',
    facilityId: 'fac-1',
    date: '2026-08-29',
    startTime: '18:00',
    endTime: '19:00',
    status: 'confirmed',
  },
  {
    id: 'bkg-2',
    facilityId: 'fac-3',
    date: '2026-08-30',
    startTime: '20:00',
    endTime: '21:00',
    status: 'confirmed',
  },
  {
    id: 'bkg-3',
    facilityId: 'fac-2',
    date: '2026-08-27',
    startTime: '10:00',
    endTime: '11:00',
    status: 'cancelled',
  },
];
