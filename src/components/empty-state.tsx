import { StyleSheet, View, type ViewProps } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type EmptyStateProps = ViewProps & {
  emoji?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * Estado vacío reutilizable para listas/pantallas de un módulo (p. ej. "Todavía
 * no hay comercios apuntados"). No es una pantalla completa como
 * `PlaceholderScreen` — se embebe dentro del contenido de una pantalla real.
 */
export function EmptyState({
  emoji = '🗒️',
  title,
  description,
  actionLabel,
  onAction,
  style,
  ...rest
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <ThemedText style={styles.emoji}>{emoji}</ThemedText>
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>
      ) : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} variant="secondary" onPress={onAction} style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  emoji: {
    fontSize: 36,
    marginBottom: Spacing.one,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  action: {
    marginTop: Spacing.three,
  },
});
