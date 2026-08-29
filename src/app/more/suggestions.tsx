import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, type BadgeVariant } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { FilterChip } from '@/components/filter-chip';
import { LoadingSpinner } from '@/components/loading-spinner';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { mockSuggestions } from '@/mocks/suggestions';
import type { Suggestion, SuggestionCategory, SuggestionStatus } from '@/types';
import { formatDate, toDateKey } from '@/utils/format-date';

const CATEGORY_INFO: Record<SuggestionCategory, { label: string }> = {
  street_lighting: { label: 'Alumbrado' },
  cleaning: { label: 'Limpieza' },
  urban_furniture: { label: 'Mobiliario urbano' },
  noise: { label: 'Ruidos' },
  suggestion: { label: 'Sugerencia' },
  other: { label: 'Otros' },
};

const CATEGORY_OPTIONS = Object.keys(CATEGORY_INFO) as SuggestionCategory[];

const STATUS_INFO: Record<SuggestionStatus, { label: string; variant: BadgeVariant }> = {
  received: { label: 'Recibido', variant: 'neutral' },
  in_progress: { label: 'En proceso', variant: 'warning' },
  resolved: { label: 'Resuelto', variant: 'success' },
};

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const sequence = String(Date.now()).slice(-4);
  return `REF-${year}-${sequence}`;
}

function SubmissionForm({ onSubmitted }: { onSubmitted: (suggestion: Suggestion) => void }) {
  const [category, setCategory] = useState<SuggestionCategory | null>(null);
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Suggestion | null>(null);

  if (confirmation) {
    return (
      <Card style={styles.confirmationCard}>
        <ThemedText type="smallBold">✅ Queja/sugerencia enviada</ThemedText>
        <ThemedText type="default">Tu número de referencia es:</ThemedText>
        <ThemedText type="subtitle">{confirmation.referenceNumber}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Podrás seguir su estado en &quot;Mis sugerencias&quot;.
        </ThemedText>
        <Button
          title="Enviar otra"
          variant="secondary"
          onPress={() => {
            setConfirmation(null);
            setCategory(null);
            setDescription('');
            setHasPhoto(false);
          }}
          style={styles.formButton}
        />
      </Card>
    );
  }

  return (
    <Card style={styles.formCard}>
      <ThemedText type="smallBold">Enviar queja o sugerencia</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Categoría
      </ThemedText>
      <View style={styles.chipRow}>
        {CATEGORY_OPTIONS.map((option) => (
          <FilterChip
            key={option}
            label={CATEGORY_INFO[option].label}
            selected={category === option}
            onPress={() => setCategory(option)}
          />
        ))}
      </View>
      <TextField
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholder="Cuéntanos qué está pasando"
        multiline
        numberOfLines={4}
        style={styles.multilineInput}
      />
      {hasPhoto ? (
        <View style={styles.photoRow}>
          <Badge label="📷 Foto adjuntada" variant="primary" />
          <Pressable
            onPress={() => setHasPhoto(false)}
            accessibilityRole="button"
            accessibilityLabel="Quitar foto adjuntada"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.removePhoto}
          >
            <ThemedText type="link" themeColor="primary">
              Quitar
            </ThemedText>
          </Pressable>
        </View>
      ) : (
        <Button
          title="📷 Adjuntar foto (opcional)"
          variant="secondary"
          onPress={() => setHasPhoto(true)}
          style={styles.formButton}
        />
      )}
      {error ? (
        <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
          {error}
        </ThemedText>
      ) : null}
      <Button
        title="Enviar"
        onPress={() => {
          if (!category) {
            setError('Elige una categoría.');
            return;
          }
          if (!description.trim()) {
            setError('Describe la queja o sugerencia.');
            return;
          }
          setError(null);
          const today = toDateKey(new Date());
          const newSuggestion: Suggestion = {
            id: `sug-user-${Date.now()}`,
            referenceNumber: generateReferenceNumber(),
            category,
            description: description.trim(),
            status: 'received',
            submittedDate: today,
            hasPhoto,
            statusHistory: [{ status: 'received', date: today }],
          };
          setConfirmation(newSuggestion);
          onSubmitted(newSuggestion);
        }}
        style={styles.formButton}
      />
    </Card>
  );
}

function SuggestionCard({
  suggestion,
  expanded,
  onToggle,
}: {
  suggestion: Suggestion;
  expanded: boolean;
  onToggle: () => void;
}) {
  const statusInfo = STATUS_INFO[suggestion.status];

  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalle de la sugerencia ${suggestion.referenceNumber}`}
        accessibilityState={{ expanded }}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitles}>
            <ThemedText type="default">{CATEGORY_INFO[suggestion.category].label}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {suggestion.referenceNumber}
            </ThemedText>
          </View>
          <Badge label={statusInfo.label} variant={statusInfo.variant} />
        </View>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          numberOfLines={expanded ? undefined : 2}
        >
          {suggestion.description}
        </ThemedText>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          {suggestion.hasPhoto ? <Badge label="📷 Con foto adjunta" /> : null}
          <ThemedText type="smallBold">Histórico de estados</ThemedText>
          {suggestion.statusHistory.map((change, index) => (
            <View key={`${change.status}-${change.date}`} style={styles.historyRow}>
              <ThemedText type="small">
                {index + 1}. {STATUS_INFO[change.status].label}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatDate(change.date)}
              </ThemedText>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

export default function SuggestionsScreen() {
  const isLoading = useSimulatedLoading();
  const [view, setView] = useState<'send' | 'my-suggestions'>('send');
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSubmitted(newSuggestion: Suggestion) {
    setSuggestions((current) => [newSuggestion, ...current]);
  }

  const sortedSuggestions = [...suggestions].sort(
    (a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime(),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Cargando el buzón…" />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.viewSwitch}>
              <FilterChip
                label="Enviar"
                selected={view === 'send'}
                onPress={() => setView('send')}
                accessibilityLabel="Ver formulario de envío"
              />
              <FilterChip
                label="Mis sugerencias"
                selected={view === 'my-suggestions'}
                onPress={() => setView('my-suggestions')}
                accessibilityLabel="Ver mis sugerencias"
              />
            </View>

            {view === 'send' ? (
              <SubmissionForm onSubmitted={handleSubmitted} />
            ) : (
              <FlatList
                data={sortedSuggestions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                  <SuggestionCard
                    suggestion={item}
                    expanded={expandedId === item.id}
                    onToggle={() =>
                      setExpandedId((current) => (current === item.id ? null : item.id))
                    }
                  />
                )}
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
  formCard: {
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  removePhoto: {
    minHeight: 32,
    justifyContent: 'center',
  },
  formButton: {
    alignSelf: 'flex-start',
  },
  confirmationCard: {
    gap: Spacing.one,
    alignItems: 'flex-start',
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  cardTitles: {
    flex: 1,
    gap: Spacing.half,
  },
  details: {
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
