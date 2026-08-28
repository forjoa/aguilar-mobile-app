import type { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { ListItem } from '@/components/list-item';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MapBackground } from '@/components/map-background';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing, type ThemeColor } from '@/constants/theme';

// Catálogo visual del sistema de diseño de HAS-6 — no forma parte de la
// navegación de la app (no hay tab ni entrada en "Más"): es documentación
// viva para el equipo, se abre navegando directamente a `/design-system`
// (p. ej. con `npx expo start --web`).

const PALETTE: { key: ThemeColor; label: string }[] = [
  { key: 'primary', label: 'primary' },
  { key: 'success', label: 'success' },
  { key: 'warning', label: 'warning' },
  { key: 'danger', label: 'danger' },
  { key: 'text', label: 'text' },
  { key: 'textSecondary', label: 'textSecondary' },
  { key: 'backgroundElement', label: 'backgroundElement' },
  { key: 'border', label: 'border' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title.toUpperCase()}
      </ThemedText>
      {children}
    </View>
  );
}

export default function DesignSystemScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ScreenHeader
            title="Guía de estilo"
            subtitle="HAS-6 — tema, componentes base y mocks compartidos"
            action={
              router.canGoBack() ? (
                <Button title="Cerrar" variant="ghost" onPress={() => router.back()} />
              ) : undefined
            }
          />

          <Section title="Colores">
            <View style={styles.swatchRow}>
              {PALETTE.map(({ key, label }) => (
                <View key={key} style={styles.swatchItem}>
                  <View style={[styles.swatch, { backgroundColor: Colors.light[key] }]} />
                  <ThemedText type="small">{label}</ThemedText>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Tipografía">
            <ThemedText type="title">Title</ThemedText>
            <ThemedText type="subtitle">Subtitle</ThemedText>
            <ThemedText type="default">Default body text</ThemedText>
            <ThemedText type="small">Small text</ThemedText>
            <ThemedText type="linkPrimary">Link primary</ThemedText>
          </Section>

          <Section title="Button">
            <View style={styles.row}>
              <Button title="Primary" variant="primary" onPress={() => {}} />
              <Button title="Secondary" variant="secondary" onPress={() => {}} />
              <Button title="Ghost" variant="ghost" onPress={() => {}} />
            </View>
            <View style={styles.row}>
              <Button title="Cargando…" loading onPress={() => {}} />
              <Button title="Deshabilitado" disabled onPress={() => {}} />
            </View>
          </Section>

          <Section title="Badge">
            <View style={styles.row}>
              <Badge label="Neutral" variant="neutral" />
              <Badge label="Activa" variant="primary" />
              <Badge label="Resuelta" variant="success" />
              <Badge label="En proceso" variant="warning" />
              <Badge label="Cancelada" variant="danger" />
            </View>
          </Section>

          <Section title="Avatar">
            <View style={styles.row}>
              <Avatar name="Marta Ruiz" size="small" />
              <Avatar name="Antonio Gómez" size="medium" />
              <Avatar name="Lucía Fernández" size="large" />
            </View>
          </Section>

          <Section title="Card + ListItem">
            <Card>
              <ThemedText type="smallBold">Panadería El Trigal</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Pan de horno de leña, bollería casera.
              </ThemedText>
            </Card>
            <ListItem
              title="Ferretería Sánchez"
              subtitle="Hogar · Calle Cervantes, 4"
              leading={<Avatar name="Ferretería Sánchez" size="small" />}
              onPress={() => {}}
            />
          </Section>

          <Section title="EmptyState">
            <EmptyState
              emoji="🔍"
              title="Sin resultados"
              description="Todavía no hay nada que mostrar aquí."
              actionLabel="Reintentar"
              onAction={() => {}}
            />
          </Section>

          <Section title="LoadingSpinner">
            <LoadingSpinner label="Cargando comercios…" />
          </Section>

          <Section title="MapBackground">
            <MapBackground accessibilityLabel="Vista de mapa de ejemplo" />
          </Section>
        </ScrollView>
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
  content: {
    gap: Spacing.five,
    padding: Spacing.four,
  },
  section: {
    gap: Spacing.three,
  },
  sectionTitle: {
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  swatchItem: {
    alignItems: 'center',
    gap: Spacing.one,
    width: 84,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: Spacing.two,
  },
});
