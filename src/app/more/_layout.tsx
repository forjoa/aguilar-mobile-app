import { Stack } from 'expo-router';

import { useTheme } from '@/hooks/use-theme';

export default function MoreLayout() {
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
      <Stack.Screen name="gamification" options={{ title: 'Puntos por civismo' }} />
      <Stack.Screen name="jobs" options={{ title: 'Bolsa de empleo' }} />
      <Stack.Screen name="pharmacy" options={{ title: 'Farmacia de guardia' }} />
      <Stack.Screen name="bus" options={{ title: 'Horarios de autobús' }} />
      <Stack.Screen name="suggestions" options={{ title: 'Quejas y sugerencias' }} />
      <Stack.Screen name="polls" options={{ title: 'Encuestas' }} />
    </Stack>
  );
}
