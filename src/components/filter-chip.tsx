import { Pressable, StyleSheet } from 'react-native';

import { Badge, type BadgeVariant } from '@/components/badge';
import { MinTouchTarget } from '@/constants/theme';

export type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Badge variant applied when selected (unselected always renders neutral). */
  variant?: BadgeVariant;
};

/** Tappable `Badge` for filter rows (category, type…) — selectable, single choice. */
export function FilterChip({ label, selected, onPress, variant = 'primary' }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Filtrar por ${label}`}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Badge label={label} variant={selected ? variant : 'neutral'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    minHeight: MinTouchTarget,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
