import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MediaPlaceholderSize = 'thumbnail' | 'hero';

export type MediaPlaceholderProps = ViewProps & {
  /** Single emoji representing the photo that would be here (e.g. by category). */
  emoji: string;
  /** `thumbnail`: small square for a list row. `hero`: 16:9, fills its container. */
  size?: MediaPlaceholderSize;
  accessibilityLabel?: string;
};

/**
 * Stand-in for a real photo (news image, product/business/facility photo…)
 * while there's no backend or real media to load (see README, no-backend
 * phase) — same purpose as `MapBackground` for map screens.
 */
export function MediaPlaceholder({
  emoji,
  size = 'thumbnail',
  accessibilityLabel = 'Imagen ilustrativa',
  style,
  ...rest
}: MediaPlaceholderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        size === 'thumbnail' ? styles.thumbnail : styles.hero,
        { backgroundColor: theme.backgroundElement },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      <ThemedText style={size === 'thumbnail' ? styles.thumbnailEmoji : styles.heroEmoji}>
        {emoji}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Radius.large,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnailEmoji: {
    fontSize: 28,
  },
  heroEmoji: {
    fontSize: 48,
  },
});
