import { Pressable, StyleSheet } from 'react-native';

import { Badge, type BadgeVariant } from '@/components/badge';
import { MinTouchTarget } from '@/constants/theme';

export type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Badge variant applied when selected (unselected always renders neutral). */
  variant?: BadgeVariant;
  /** E.g. an already-taken time slot — not selectable, no pressed feedback. */
  disabled?: boolean;
  /**
   * Overrides the default `Filtrar por ${label}` reading — e.g. for a
   * view-switcher ("Ver como mapa") rather than an actual filter.
   */
  accessibilityLabel?: string;
};

/** Tappable `Badge` for filter rows (category, type…) — selectable, single choice. */
export function FilterChip({
  label,
  selected,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={accessibilityLabel ?? `Filtrar por ${label}`}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
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
  disabled: {
    opacity: 0.4,
  },
});
