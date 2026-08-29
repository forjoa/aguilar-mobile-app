import { useMemo, useState } from 'react';
import {
  AccessibilityInfo,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { FilterChip } from '@/components/filter-chip';
import { LoadingSpinner } from '@/components/loading-spinner';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useCivicPoints } from '@/hooks/use-civic-points';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { useTimedMessage } from '@/hooks/use-timed-message';
import { mockCommunityPlanComments } from '@/mocks/community-plan-comments';
import { mockCommunityPlans } from '@/mocks/community-plans';
import { mockUsers } from '@/mocks/users';
import type { CommunityPlan } from '@/types';
import { formatDateTime } from '@/utils/format-date';
import { parseSpanishDateTime } from '@/utils/parse-spanish-date-time';

const ALL_CATEGORIES = 'all';
const KNOWN_CATEGORIES = ['Deporte', 'Ocio', 'Cultural', 'Vecinal', 'Solidaridad'];

// Civic points awarded for joining a plan (see Gamificación, HAS-18).
const PLAN_JOIN_POINTS = 5;

/** Up to 3 names for the "Participantes: ..." line — includes "Tú" first when joined. */
function getFeaturedParticipants(plan: CommunityPlan): string[] {
  const maxShown = Math.min(3, plan.attendeeCount);
  if (maxShown === 0) {
    return [];
  }

  const names = plan.isJoined ? ['Tú'] : [];
  const remainingSlots = maxShown - names.length;

  if (remainingSlots > 0) {
    const planNumber = Number(plan.id.split('-')[1]) || 0;
    const otherCount = Math.min(remainingSlots, mockUsers.length);
    for (let i = 0; i < otherCount; i += 1) {
      names.push(mockUsers[(planNumber + i) % mockUsers.length].name);
    }
  }

  return names;
}

function CreatePlanForm({
  onCreate,
  onCancel,
}: {
  onCreate: (plan: CommunityPlan) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError('Rellena el título y la descripción.');
      return;
    }
    if (!category) {
      setError('Elige una categoría.');
      return;
    }
    const date = parseSpanishDateTime(dateText, timeText);
    if (!date) {
      setError('Revisa la fecha (DD/MM/AAAA) y la hora (HH:MM).');
      return;
    }

    onCreate({
      id: `plan-user-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      organizer: 'Tú',
      date: date.toISOString(),
      attendeeCount: 1,
      isJoined: true,
    });
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Card style={styles.formCard}>
        <ThemedText type="smallBold">Proponer un plan</ThemedText>
        <TextField
          label="Título"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Quedada en el parque"
        />
        <TextField
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          placeholder="¿En qué consiste el plan?"
          multiline
          numberOfLines={3}
          style={styles.multilineInput}
        />
        <View style={styles.dateTimeRow}>
          <TextField
            label="Fecha"
            value={dateText}
            onChangeText={setDateText}
            placeholder="DD/MM/AAAA"
            style={styles.dateTimeInput}
          />
          <TextField
            label="Hora"
            value={timeText}
            onChangeText={setTimeText}
            placeholder="HH:MM"
            style={styles.dateTimeInput}
          />
        </View>
        <View style={styles.categoryPickerRow}>
          {KNOWN_CATEGORIES.map((option) => (
            <FilterChip
              key={option}
              label={option}
              selected={category === option}
              onPress={() => setCategory(option)}
            />
          ))}
        </View>
        {error ? (
          <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
            {error}
          </ThemedText>
        ) : null}
        <View style={styles.formActions}>
          <Button title="Cancelar" variant="ghost" onPress={onCancel} />
          <Button title="Crear plan" onPress={handleSubmit} />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}

function PlanCard({
  plan,
  expanded,
  onToggle,
  onToggleJoin,
}: {
  plan: CommunityPlan;
  expanded: boolean;
  onToggle: () => void;
  onToggleJoin: () => void;
}) {
  const participants = getFeaturedParticipants(plan);
  const extraParticipants = plan.attendeeCount - participants.length;
  const comments = mockCommunityPlanComments[plan.id] ?? [];

  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalle del plan ${plan.title}`}
        accessibilityState={{ expanded }}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitles}>
            <ThemedText type="default">{plan.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {plan.organizer}
            </ThemedText>
          </View>
          <Badge label={plan.category} />
        </View>
        <View style={styles.cardMeta}>
          <ThemedText type="small" themeColor="textSecondary">
            {formatDateTime(plan.date)}
          </ThemedText>
          <Badge
            label={`${plan.attendeeCount} apuntados`}
            variant={plan.isJoined ? 'primary' : 'neutral'}
          />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <ThemedText type="default">{plan.description}</ThemedText>

          <ThemedText type="small" themeColor="textSecondary">
            {participants.length > 0
              ? `Participantes: ${participants.join(', ')}${
                  extraParticipants > 0 ? ` y ${extraParticipants} más` : ''
                }`
              : 'Todavía no hay nadie apuntado.'}
          </ThemedText>

          <View style={styles.commentsSection}>
            <ThemedText type="smallBold">Comentarios</ThemedText>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <ThemedText type="smallBold">{comment.author}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {comment.text}
                  </ThemedText>
                </View>
              ))
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                Sé el primero en comentar.
              </ThemedText>
            )}
          </View>

          <Button
            title={plan.isJoined ? 'Apuntado ✓' : 'Unirme'}
            variant={plan.isJoined ? 'secondary' : 'primary'}
            onPress={onToggleJoin}
            style={styles.joinButton}
          />
        </View>
      ) : null}
    </Card>
  );
}

export default function CommunityScreen() {
  const isLoading = useSimulatedLoading();
  const { addPoints } = useCivicPoints();
  const [pointsMessage, showPointsMessage] = useTimedMessage();
  const [plans, setPlans] = useState<CommunityPlan[]>(mockCommunityPlans);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_CATEGORIES);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(plans.map((plan) => plan.category))).sort(),
    [plans],
  );

  const filteredPlans = useMemo(
    () =>
      plans.filter((plan) => categoryFilter === ALL_CATEGORIES || plan.category === categoryFilter),
    [plans, categoryFilter],
  );

  function handleCreate(newPlan: CommunityPlan) {
    setPlans((current) => [newPlan, ...current]);
    setCategoryFilter(ALL_CATEGORIES);
    setExpandedId(newPlan.id);
    setIsCreateFormOpen(false);
  }

  function handleToggleJoin(planId: string) {
    const plan = plans.find((p) => p.id === planId);
    if (plan && !plan.isJoined) {
      addPoints('Te apuntaste a un plan', PLAN_JOIN_POINTS);
      showPointsMessage(`+${PLAN_JOIN_POINTS} puntos`);
      // accessibilityLiveRegion on the Badge below is Android-only —
      // this announces on iOS too.
      AccessibilityInfo.announceForAccessibility(`Ganaste ${PLAN_JOIN_POINTS} puntos.`);
    }
    setPlans((current) =>
      current.map((p) =>
        p.id === planId
          ? {
              ...p,
              isJoined: !p.isJoined,
              attendeeCount: p.attendeeCount + (p.isJoined ? -1 : 1),
            }
          : p,
      ),
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Cargando planes…" />
          </View>
        ) : (
          <FlatList
            data={filteredPlans}
            keyExtractor={(plan) => plan.id}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
              <View style={styles.headerSection}>
                {pointsMessage ? (
                  <Badge label={pointsMessage} variant="success" accessibilityLiveRegion="polite" />
                ) : null}
                {isCreateFormOpen ? (
                  <CreatePlanForm
                    onCreate={handleCreate}
                    onCancel={() => setIsCreateFormOpen(false)}
                  />
                ) : (
                  <Button title="Proponer un plan" onPress={() => setIsCreateFormOpen(true)} />
                )}
                <View style={styles.filterRow}>
                  <FilterChip
                    label="Todas"
                    selected={categoryFilter === ALL_CATEGORIES}
                    onPress={() => setCategoryFilter(ALL_CATEGORIES)}
                  />
                  {categories.map((category) => (
                    <FilterChip
                      key={category}
                      label={category}
                      selected={categoryFilter === category}
                      onPress={() => setCategoryFilter(category)}
                    />
                  ))}
                </View>
              </View>
            }
            ListEmptyComponent={
              <EmptyState
                emoji="🤝"
                title="Sin planes para este filtro"
                description="Prueba a quitar el filtro o propón tú el primer plan."
              />
            }
            renderItem={({ item }) => (
              <PlanCard
                plan={item}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId((current) => (current === item.id ? null : item.id))}
                onToggleJoin={() => handleToggleJoin(item.id)}
              />
            )}
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
    gap: Spacing.three,
    padding: Spacing.four,
  },
  headerSection: {
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  formCard: {
    gap: Spacing.two,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dateTimeInput: {
    flex: 1,
  },
  categoryPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
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
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  details: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  commentsSection: {
    gap: Spacing.one,
  },
  comment: {
    gap: Spacing.half,
  },
  joinButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
