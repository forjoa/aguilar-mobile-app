import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { FilterChip } from '@/components/filter-chip';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MediaPlaceholder } from '@/components/media-placeholder';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { mockEvents } from '@/mocks/events';
import { mockNews } from '@/mocks/news';
import type { Event, News } from '@/types';
import { formatDate, formatDateTime } from '@/utils/format-date';

const ALL_CATEGORIES = 'all';

const CATEGORY_EMOJI: Record<string, string> = {
  Institucional: '🏛️',
  Cultura: '🎭',
  Deporte: '⚽',
  'Medio ambiente': '🌳',
};

function categoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '📰';
}

type Board = 'news' | 'events';

function NewsCard({
  item,
  expanded,
  onToggle,
}: {
  item: News;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`Ver noticia ${item.title}`}
        accessibilityState={{ expanded }}
        style={({ pressed }) => [styles.cardRow, pressed && styles.pressed]}
      >
        <MediaPlaceholder emoji={categoryEmoji(item.category)} />
        <View style={styles.cardTexts}>
          <ThemedText type="default" numberOfLines={2}>
            {item.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formatDate(item.publishedDate)}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
            {item.summary}
          </ThemedText>
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <MediaPlaceholder emoji={categoryEmoji(item.category)} size="hero" />
          <View style={styles.detailMeta}>
            <Badge label={item.category} />
            <ThemedText type="small" themeColor="textSecondary">
              {formatDate(item.publishedDate)}
            </ThemedText>
          </View>
          <ThemedText type="default">{item.body}</ThemedText>
        </View>
      ) : null}
    </Card>
  );
}

function EventCard({
  item,
  expanded,
  onToggle,
  onToggleInterested,
}: {
  item: Event;
  expanded: boolean;
  onToggle: () => void;
  onToggleInterested: () => void;
}) {
  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`Ver evento ${item.title}`}
        accessibilityState={{ expanded }}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitles}>
            <ThemedText type="default">{item.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {formatDateTime(item.startDate)} · {item.location}
            </ThemedText>
          </View>
          <Badge label={item.category} />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <ThemedText type="default">{item.description}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            📍 {item.location}
          </ThemedText>
          <Button
            title={item.interested ? 'Me interesa ✓' : 'Me interesa'}
            variant={item.interested ? 'secondary' : 'primary'}
            onPress={onToggleInterested}
            style={styles.interestedButton}
          />
        </View>
      ) : null}
    </Card>
  );
}

export default function NewsScreen() {
  const isLoading = useSimulatedLoading();
  const [board, setBoard] = useState<Board>('news');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_CATEGORIES);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedNews = useMemo(
    () =>
      [...mockNews].sort(
        (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
      ),
    [],
  );
  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
    [events],
  );

  const categories = useMemo(() => {
    const source = board === 'news' ? sortedNews : sortedEvents;
    return Array.from(new Set(source.map((item) => item.category))).sort();
  }, [board, sortedNews, sortedEvents]);

  const filteredNews = useMemo(
    () =>
      sortedNews.filter(
        (item) => categoryFilter === ALL_CATEGORIES || item.category === categoryFilter,
      ),
    [sortedNews, categoryFilter],
  );
  const filteredEvents = useMemo(
    () =>
      sortedEvents.filter(
        (item) => categoryFilter === ALL_CATEGORIES || item.category === categoryFilter,
      ),
    [sortedEvents, categoryFilter],
  );

  function handleSwitchBoard(next: Board) {
    setBoard(next);
    setCategoryFilter(ALL_CATEGORIES);
    setExpandedId(null);
  }

  function handleToggleInterested(id: string) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, interested: !event.interested } : event,
      ),
    );
  }

  const headerSection = (
    <View style={styles.headerSection}>
      <View style={styles.chipRow}>
        <FilterChip
          label="Noticias"
          selected={board === 'news'}
          onPress={() => handleSwitchBoard('news')}
        />
        <FilterChip
          label="Eventos"
          selected={board === 'events'}
          onPress={() => handleSwitchBoard('events')}
        />
      </View>
      <View style={styles.chipRow}>
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
  );

  const emptyState = (
    <EmptyState
      emoji="📰"
      title={board === 'news' ? 'No hay noticias para este filtro' : 'No hay eventos próximos'}
      description="Prueba a quitar el filtro de categoría."
    />
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Cargando el tablón…" />
          </View>
        ) : board === 'news' ? (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.content}
            ListHeaderComponent={headerSection}
            ListEmptyComponent={emptyState}
            renderItem={({ item }) => (
              <NewsCard
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId((current) => (current === item.id ? null : item.id))}
              />
            )}
          />
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.content}
            ListHeaderComponent={headerSection}
            ListEmptyComponent={emptyState}
            renderItem={({ item }) => (
              <EventCard
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId((current) => (current === item.id ? null : item.id))}
                onToggleInterested={() => handleToggleInterested(item.id)}
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
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  card: {
    gap: Spacing.two,
  },
  cardRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  cardTexts: {
    flex: 1,
    gap: Spacing.half,
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
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  detailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interestedButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
