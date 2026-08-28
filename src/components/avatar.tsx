import { useState } from 'react';
import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getInitials } from '@/utils/get-initials';

const SIZE_BY_PRESET = {
  small: 32,
  medium: 40,
  large: 56,
} as const;

export type AvatarProps = {
  /** Nombre completo, usado como fallback de iniciales y como accessibilityLabel. */
  name: string;
  source?: ImageSource | string;
  size?: keyof typeof SIZE_BY_PRESET;
};

export function Avatar({ name, source, size = 'medium' }: AvatarProps) {
  const theme = useTheme();
  const [hasError, setHasError] = useState(false);
  const dimension = SIZE_BY_PRESET[size];
  const showImage = Boolean(source) && !hasError;

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: Radius.pill,
          backgroundColor: theme.backgroundSelected,
        },
      ]}
      accessibilityRole="image"
      accessibilityLabel={`Avatar de ${name}`}
    >
      {showImage ? (
        <Image
          source={source}
          style={[StyleSheet.absoluteFill, { borderRadius: Radius.pill }]}
          contentFit="cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <ThemedText type="smallBold" style={{ fontSize: dimension * 0.4 }}>
          {getInitials(name)}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
