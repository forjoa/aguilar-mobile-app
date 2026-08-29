import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';

import { MinTouchTarget, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CardProps = ViewProps & {
  /** When passed, the whole Card becomes pressable (accessible as a button). */
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function Card({ style, onPress, accessibilityLabel, children, ...rest }: CardProps) {
  const theme = useTheme();
  const content = (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }, style]} {...rest}>
      {children}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.pressableMinSize, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  pressableMinSize: {
    minHeight: MinTouchTarget,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
