import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { FilterChip } from '@/components/filter-chip';
import { ListItem } from '@/components/list-item';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { useTheme } from '@/hooks/use-theme';
import { mockBookings } from '@/mocks/bookings';
import { mockFacilities } from '@/mocks/facilities';
import type { Booking, Facility, FacilityType } from '@/types';
import { formatDate } from '@/utils/format-date';
import { getUpcomingDays } from '@/utils/get-upcoming-days';

const FACILITY_TYPE_INFO: Record<FacilityType, { label: string; emoji: string }> = {
  padel: { label: 'Pádel', emoji: '🏓' },
  five_a_side_football: { label: 'Fútbol sala', emoji: '⚽' },
  tennis: { label: 'Tenis', emoji: '🎾' },
};

// Hourly slots, the facilities' opening window.
const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

const UPCOMING_DAYS = getUpcomingDays(10);

function addOneHour(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  return `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateChipLabel(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

type Step = 'facility' | 'datetime' | 'confirmation';

export default function BookingsScreen() {
  const theme = useTheme();
  const isLoading = useSimulatedLoading();
  const [view, setView] = useState<'book' | 'my-bookings'>('book');
  const [step, setStep] = useState<Step>('facility');
  const [facility, setFacility] = useState<Facility | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Keyed by facility+date+time — mockBookings simulates slots other
  // neighbors already took, myBookings are the ones the current user just
  // made in this session.
  const isSlotTaken = useMemo(() => {
    const takenKeys = new Set(
      [...mockBookings, ...myBookings]
        .filter((booking) => booking.status === 'confirmed')
        .map((booking) => `${booking.facilityId}|${booking.date}|${booking.startTime}`),
    );
    return (facilityId: string, candidateDateKey: string, candidateStart: string) =>
      takenKeys.has(`${facilityId}|${candidateDateKey}|${candidateStart}`);
  }, [myBookings]);

  function resetWizard() {
    setStep('facility');
    setFacility(null);
    setDateKey(null);
    setStartTime(null);
  }

  function handleConfirm() {
    if (!facility || !dateKey || !startTime) {
      return;
    }
    const newBooking: Booking = {
      id: `bkg-user-${Date.now()}`,
      facilityId: facility.id,
      date: dateKey,
      startTime,
      endTime: addOneHour(startTime),
      status: 'confirmed',
    };
    setMyBookings((current) => [newBooking, ...current]);
    resetWizard();
    setView('my-bookings');
  }

  function handleCancelBooking(id: string) {
    setMyBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status: 'cancelled' } : booking)),
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Cargando instalaciones…" />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.viewSwitch}>
              <FilterChip
                label="Reservar"
                selected={view === 'book'}
                onPress={() => setView('book')}
                accessibilityLabel="Ver formulario de reserva"
              />
              <FilterChip
                label="Mis reservas"
                selected={view === 'my-bookings'}
                onPress={() => setView('my-bookings')}
                accessibilityLabel="Ver mis reservas"
              />
            </View>

            {view === 'book' ? (
              <ScrollView
                style={styles.wizardScroll}
                contentContainerStyle={styles.wizard}
                keyboardShouldPersistTaps="handled"
              >
                {step !== 'facility' ? (
                  <Button
                    title="Atrás"
                    variant="ghost"
                    onPress={() =>
                      setStep((current) => (current === 'confirmation' ? 'datetime' : 'facility'))
                    }
                    style={styles.backButton}
                  />
                ) : null}

                {step === 'facility' ? (
                  <View style={styles.stepList}>
                    <ThemedText type="smallBold">¿Qué instalación quieres reservar?</ThemedText>
                    {mockFacilities.map((item) => (
                      <ListItem
                        key={item.id}
                        title={item.name}
                        subtitle={item.description}
                        leading={
                          // Stand-in for a real facility photo while there's no backend or
                          // real media (see README) — hidden from screen readers since the
                          // row itself already carries the accessible title/subtitle.
                          <View
                            style={[
                              styles.facilityPhoto,
                              { backgroundColor: theme.backgroundElement },
                            ]}
                            accessibilityElementsHidden
                            importantForAccessibility="no-hide-descendants"
                          >
                            <ThemedText style={styles.facilityPhotoEmoji}>
                              {FACILITY_TYPE_INFO[item.type].emoji}
                            </ThemedText>
                          </View>
                        }
                        onPress={() => {
                          setFacility(item);
                          setStep('datetime');
                        }}
                      />
                    ))}
                  </View>
                ) : null}

                {step === 'datetime' && facility ? (
                  <View style={styles.stepList}>
                    <ThemedText type="smallBold">Elige fecha</ThemedText>
                    <View style={styles.chipRow}>
                      {UPCOMING_DAYS.map((day) => {
                        const key = toDateKey(day);
                        return (
                          <FilterChip
                            key={key}
                            label={formatDateChipLabel(day)}
                            selected={dateKey === key}
                            onPress={() => {
                              setDateKey(key);
                              setStartTime(null);
                            }}
                          />
                        );
                      })}
                    </View>

                    {dateKey ? (
                      <>
                        <ThemedText type="smallBold">Elige franja horaria</ThemedText>
                        <View style={styles.chipRow}>
                          {TIME_SLOTS.map((slot) => {
                            const taken = isSlotTaken(facility.id, dateKey, slot);
                            return (
                              <FilterChip
                                key={slot}
                                label={taken ? `${slot} (ocupada)` : `${slot}-${addOneHour(slot)}`}
                                selected={startTime === slot}
                                disabled={taken}
                                onPress={() => setStartTime(slot)}
                              />
                            );
                          })}
                        </View>
                      </>
                    ) : null}

                    <Button
                      title="Continuar"
                      onPress={() => setStep('confirmation')}
                      disabled={!dateKey || !startTime}
                      style={styles.continueButton}
                    />
                  </View>
                ) : null}

                {step === 'confirmation' && facility && dateKey && startTime ? (
                  <Card style={styles.summaryCard}>
                    <ThemedText type="smallBold">Resumen de la reserva</ThemedText>
                    <ThemedText type="default">{facility.name}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {formatDate(dateKey)}, {startTime}-{addOneHour(startTime)}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      💳 Próximamente: pago online
                    </ThemedText>
                    <Button
                      title="Confirmar reserva"
                      onPress={handleConfirm}
                      style={styles.continueButton}
                    />
                  </Card>
                ) : null}
              </ScrollView>
            ) : (
              <FlatList
                data={myBookings}
                keyExtractor={(booking) => booking.id}
                contentContainerStyle={styles.myBookingsList}
                ListEmptyComponent={
                  <EmptyState
                    emoji="🏟️"
                    title="Aún no has hecho ninguna reserva"
                    description="Reserva una instalación desde la pestaña 'Reservar'."
                  />
                }
                renderItem={({ item }) => {
                  const itemFacility = mockFacilities.find((f) => f.id === item.facilityId);
                  return (
                    <Card style={styles.bookingCard}>
                      <View style={styles.bookingHeader}>
                        <ThemedText type="default">
                          {itemFacility?.name ?? 'Instalación'}
                        </ThemedText>
                        <Badge
                          label={item.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                          variant={item.status === 'confirmed' ? 'primary' : 'neutral'}
                        />
                      </View>
                      <ThemedText type="small" themeColor="textSecondary">
                        {formatDate(item.date)}, {item.startTime}-{item.endTime}
                      </ThemedText>
                      {item.status === 'confirmed' ? (
                        <Button
                          title="Cancelar reserva"
                          variant="secondary"
                          onPress={() => handleCancelBooking(item.id)}
                          style={[
                            styles.cancelButton,
                            {
                              backgroundColor: theme.background,
                              borderColor: theme.border,
                              borderWidth: 1,
                            },
                          ]}
                        />
                      ) : null}
                    </Card>
                  );
                }}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: Spacing.three,
    padding: Spacing.four,
  },
  viewSwitch: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  wizardScroll: {
    flex: 1,
  },
  wizard: {
    gap: Spacing.three,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  stepList: {
    gap: Spacing.two,
  },
  facilityPhoto: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityPhotoEmoji: {
    fontSize: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  continueButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
  summaryCard: {
    gap: Spacing.one,
  },
  myBookingsList: {
    gap: Spacing.three,
  },
  bookingCard: {
    gap: Spacing.one,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
});
