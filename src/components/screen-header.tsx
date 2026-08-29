import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type ScreenHeaderProps = ViewProps & {
  title: string;
  subtitle?: string;
  /** Slot for a right-side action (e.g. a filter icon). */
  action?: ReactNode;
};

/**
 * Content header for a screen's body (does not replace Expo Router's native
 * navigation bar) — title + optional subtitle + action.
 */
export function ScreenHeader({ title, subtitle, action, style, ...rest }: ScreenHeaderProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.texts}>
        <ThemedText type="title" style={styles.title} accessibilityRole="header">
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="default" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  texts: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
});
