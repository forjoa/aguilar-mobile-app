import { SymbolView } from 'expo-symbols';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const EXTRA_MODULES = [
  { href: '/mas/gamificacion', emoji: '🏅', title: 'Puntos por civismo' },
  { href: '/mas/empleo', emoji: '💼', title: 'Bolsa de empleo' },
  { href: '/mas/farmacia', emoji: '💊', title: 'Farmacia de guardia' },
  { href: '/mas/autobus', emoji: '🚌', title: 'Horarios de autobús' },
  { href: '/mas/buzon', emoji: '📮', title: 'Quejas y sugerencias' },
  { href: '/mas/encuestas', emoji: '🗳️', title: 'Encuestas' },
] as const;

export default function MasScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Más
          </ThemedText>
          {EXTRA_MODULES.map((item) => (
            <Link key={item.href} href={item.href} asChild>
              <ThemedView type="backgroundElement" style={styles.row}>
                <ThemedText style={styles.rowEmoji}>{item.emoji}</ThemedText>
                <ThemedText type="default" style={styles.rowTitle}>
                  {item.title}
                </ThemedText>
                <SymbolView
                  name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                  tintColor={theme.textSecondary}
                  size={16}
                />
              </ThemedView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  rowEmoji: {
    fontSize: 22,
  },
  rowTitle: {
    flex: 1,
  },
});
