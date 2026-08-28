import type { ReactNode } from 'react';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const GRID_LINES = [0.25, 0.5, 0.75] as const;

export type MapBackgroundProps = ViewProps & {
  /** Contenido superpuesto (marcadores, chinchetas…) una vez haya datos reales. */
  children?: ReactNode;
  accessibilityLabel?: string;
};

/**
 * Fondo de mapa básico y puramente visual — sin datos geográficos reales.
 * Pensado como base reutilizable para Incidencias (HAS-8) y, si aplica,
 * Autobús/rutas (HAS-15) mientras no haya una librería de mapas integrada;
 * cuando la haya, ese módulo puede sustituir el fondo sin tocar el resto del
 * layout de su pantalla.
 */
export function MapBackground({
  children,
  accessibilityLabel = 'Vista de mapa',
  style,
  ...rest
}: MapBackgroundProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundElement }, style]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {GRID_LINES.map((position) => (
        <View
          key={`h-${position}`}
          style={[
            styles.gridLineHorizontal,
            { top: `${position * 100}%`, backgroundColor: theme.border },
          ]}
        />
      ))}
      {GRID_LINES.map((position) => (
        <View
          key={`v-${position}`}
          style={[
            styles.gridLineVertical,
            { left: `${position * 100}%`, backgroundColor: theme.border },
          ]}
        />
      ))}
      <View style={[StyleSheet.absoluteFill, styles.pin]} pointerEvents="none">
        <SymbolView
          name={{ ios: 'mappin', android: 'place', web: 'place' }}
          tintColor={theme.primary}
          size={28}
        />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    borderRadius: Radius.large,
    overflow: 'hidden',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
  },
  pin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
