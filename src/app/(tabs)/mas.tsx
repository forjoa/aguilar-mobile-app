import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListItem } from '@/components/list-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const EXTRA_MODULES = [
  { href: '/mas/gamificacion', emoji: '🏅', title: 'Puntos por civismo' },
  { href: '/mas/empleo', emoji: '💼', title: 'Bolsa de empleo' },
  { href: '/mas/farmacia', emoji: '💊', title: 'Farmacia de guardia' },
  { href: '/mas/autobus', emoji: '🚌', title: 'Horarios de autobús' },
  { href: '/mas/buzon', emoji: '📮', title: 'Quejas y sugerencias' },
  { href: '/mas/encuestas', emoji: '🗳️', title: 'Encuestas' },
] as const;

export default function MasScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Más
          </ThemedText>
          {EXTRA_MODULES.map((item) => (
            <Link key={item.href} href={item.href} asChild>
              <ListItem
                title={item.title}
                leading={<ThemedText style={styles.rowEmoji}>{item.emoji}</ThemedText>}
                accessibilityRole="link"
              />
            </Link>
          ))}
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
    gap: Spacing.two,
    padding: Spacing.four,
  },
  title: {
    fontSize: 28,
    marginBottom: Spacing.two,
  },
  rowEmoji: {
    fontSize: 22,
  },
});
