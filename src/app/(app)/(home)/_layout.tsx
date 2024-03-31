import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'tamagui';

const HomeLayout = () => {
  const theme = useTheme();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.gray12.get(),
          tabBarInactiveTintColor: theme.gray8.get(),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.gray1.get(),
            elevation: 0,
            borderTopWidth: 0,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'home',
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name="home-filled" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'stats',
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name="bar-chart" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ranking"
          options={{
            title: 'ranking',
            tabBarIcon: ({ focused, color }) => <Ionicons name="trophy" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'market',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="storefront" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'settings',
            tabBarIcon: ({ focused, color }) => <Ionicons name="menu" size={24} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};

export default HomeLayout;
