import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ListItem } from '@/components/list-item';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { mockPharmacies } from '@/mocks/pharmacies';
import type { Pharmacy } from '@/types';
import { formatRelativeDay } from '@/utils/format-date';
import { getPharmacyDutySchedule } from '@/utils/get-pharmacy-duty-schedule';

const SCHEDULE_DAYS = 21; // ~3 weeks of rotation, per the issue's checklist.

const PHARMACY_BY_ID = new Map(mockPharmacies.map((pharmacy) => [pharmacy.id, pharmacy]));

// Every id in the schedule comes straight from mockPharmacies, so the lookup
// below always resolves — hence the non-null assertion.
const UPCOMING_SHIFTS = getPharmacyDutySchedule(
  mockPharmacies.map((pharmacy) => pharmacy.id),
  SCHEDULE_DAYS,
).map((shift) => ({ shift, pharmacy: PHARMACY_BY_ID.get(shift.pharmacyId)! }));

const TODAY_ON_DUTY: Pharmacy | undefined = UPCOMING_SHIFTS[0]?.pharmacy;
const NEXT_SHIFTS = UPCOMING_SHIFTS.slice(1);

function TodayOnDutyCard({ pharmacy }: { pharmacy: Pharmacy }) {
  const [directionsOpened, setDirectionsOpened] = useState(false);

  return (
    <Card style={styles.todayCard}>
      <View style={styles.todayHeader}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          DE GUARDIA HOY
        </ThemedText>
        <Badge label="Hoy" variant="primary" />
      </View>
      <ThemedText type="subtitle" style={styles.todayName}>
        {pharmacy.name}
      </ThemedText>
      <ThemedText type="default">{pharmacy.address}</ThemedText>
      <ThemedText type="default" themeColor="textSecondary">
        {pharmacy.phone}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Horario habitual: {pharmacy.regularHours}
      </ThemedText>
      {directionsOpened ? (
        <Badge
          label="🗺️ Abriendo mapa (simulado)"
          variant="success"
          style={styles.directionsBadge}
        />
      ) : (
        <Button
          title="Cómo llegar"
          onPress={() => setDirectionsOpened(true)}
          style={styles.directionsButton}
        />
      )}
    </Card>
  );
}

export default function PharmacyScreen() {
  const isLoading = useSimulatedLoading();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Buscando la farmacia de guardia…" />
          </View>
        ) : (
          <FlatList
            // Today's is already shown by TodayOnDutyCard above — this list
            // covers what comes after it, so there's no duplicate "Hoy" row.
            data={NEXT_SHIFTS}
            keyExtractor={(entry) => entry.shift.date}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
              <View style={styles.headerSection}>
                {TODAY_ON_DUTY ? <TodayOnDutyCard pharmacy={TODAY_ON_DUTY} /> : null}
                <ThemedText type="smallBold">Próximos turnos de guardia</ThemedText>
              </View>
            }
            renderItem={({ item }) => (
              <ListItem
                title={`${formatRelativeDay(item.shift.date)} · ${item.pharmacy.name}`}
                subtitle={item.pharmacy.address}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={
              <View style={styles.footerSection}>
                <ThemedText type="smallBold">Todas las farmacias del pueblo</ThemedText>
                {mockPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id} style={styles.pharmacyCard}>
                    <ThemedText type="default">{pharmacy.name}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {pharmacy.address} · {pharmacy.phone}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {pharmacy.regularHours}
                    </ThemedText>
                  </Card>
                ))}
              </View>
            }
          />
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
    gap: Spacing.two,
    padding: Spacing.four,
  },
  headerSection: {
    gap: Spacing.three,
    marginBottom: Spacing.one,
  },
  todayCard: {
    gap: Spacing.one,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayName: {
    marginBottom: Spacing.one,
  },
  directionsButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.two,
  },
  directionsBadge: {
    marginTop: Spacing.two,
  },
  separator: {
    height: Spacing.one,
  },
  footerSection: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  pharmacyCard: {
    gap: Spacing.half,
  },
});
