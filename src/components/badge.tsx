import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Also doubles as a "chip": same label pill, different usage context
// (an incident/suggestion status vs. a selectable category/filter).
export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
};

const COLOR_BY_VARIANT: Record<BadgeVariant, ThemeColor> = {
  neutral: 'textSecondary',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export function Badge({ label, variant = 'neutral', style, ...rest }: BadgeProps) {
  const theme = useTheme();
  const color = theme[COLOR_BY_VARIANT[variant]];

  return (
    <View
      style={[styles.badge, { backgroundColor: theme.backgroundElement }, style]}
      accessibilityRole="text"
      {...rest}
    >
      <ThemedText type="smallBold" style={[styles.label, { color }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
});
