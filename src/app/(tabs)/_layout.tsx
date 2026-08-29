import type { SymbolViewProps } from 'expo-symbols';
import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type IconName = SymbolViewProps['name'];

function tabIcon(name: IconName) {
  function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return <SymbolView name={name} tintColor={color} size={size} />;
  }
  return TabIcon;
}

export default function TabsLayout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tablón',
          tabBarIcon: tabIcon({ ios: 'newspaper', android: 'article', web: 'article' }),
        }}
      />
      <Tabs.Screen
        name="incidents"
        options={{
          title: 'Incidencias',
          tabBarIcon: tabIcon({ ios: 'map', android: 'map', web: 'map' }),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Reservas',
          tabBarIcon: tabIcon({
            ios: 'sportscourt',
            android: 'sports_tennis',
            web: 'sports_tennis',
          }),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Comunidad',
          tabBarIcon: tabIcon({ ios: 'person.3', android: 'groups', web: 'groups' }),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: 'Comercio',
          tabBarIcon: tabIcon({ ios: 'storefront', android: 'storefront', web: 'storefront' }),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Citas',
          tabBarIcon: tabIcon({ ios: 'calendar', android: 'event', web: 'event' }),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Más',
          tabBarIcon: tabIcon({ ios: 'ellipsis', android: 'more_horiz', web: 'more_horiz' }),
        }}
      />
    </Tabs>
  );
}
