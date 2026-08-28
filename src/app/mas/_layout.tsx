import { Stack } from 'expo-router';

import { useTheme } from '@/hooks/use-theme';

export default function MasLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text },
      }}
    >
      <Stack.Screen name="gamificacion" options={{ title: 'Puntos por civismo' }} />
      <Stack.Screen name="empleo" options={{ title: 'Bolsa de empleo' }} />
      <Stack.Screen name="farmacia" options={{ title: 'Farmacia de guardia' }} />
      <Stack.Screen name="autobus" options={{ title: 'Horarios de autobús' }} />
      <Stack.Screen name="buzon" options={{ title: 'Quejas y sugerencias' }} />
      <Stack.Screen name="encuestas" options={{ title: 'Encuestas' }} />
    </Stack>
  );
}
