import { ActivityIndicator, StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LoadingSpinnerProps = ViewProps & {
  /** Optional text below the spinner (e.g. "Cargando comercios…"). */
  label?: string;
  size?: 'small' | 'large';
};

export function LoadingSpinner({ label, size = 'small', style, ...rest }: LoadingSpinnerProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? 'Cargando'}
      {...rest}
    >
      <ActivityIndicator size={size} color={theme.primary} />
      {label ? (
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
