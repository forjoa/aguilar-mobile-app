import type { ReactNode } from 'react';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View, type AccessibilityRole, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MinTouchTarget, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ListItemProps = ViewProps & {
  title: string;
  subtitle?: string;
  /** Slot a la izquierda: un `Avatar`, un emoji en `ThemedText`, un icono… */
  leading?: ReactNode;
  /** Por defecto, un chevron si hay `onPress`; pasa `null` para quitarlo. */
  trailing?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  /**
   * Rol semántico del `Pressable` cuando hay `onPress`. Por defecto "button"
   * (una acción); pásalo como "link" cuando la fila navega (p. ej. dentro de
   * un `<Link asChild>`) para que web conserve semántica de enlace real.
   */
  accessibilityRole?: AccessibilityRole;
};

/** Fila genérica de lista: icono/avatar + título/subtítulo + accesorio. */
export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  accessibilityLabel,
  accessibilityRole = 'button',
  style,
  ...rest
}: ListItemProps) {
  const theme = useTheme();

  const trailingContent =
    trailing !== undefined ? (
      trailing
    ) : onPress ? (
      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
        tintColor={theme.textSecondary}
        size={16}
      />
    ) : null;

  const content = (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement }, style]} {...rest}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.texts}>
        <ThemedText type="default" numberOfLines={1}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {trailingContent}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? title}
      style={({ pressed }) => pressed && styles.pressed}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MinTouchTarget,
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.large,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
});
