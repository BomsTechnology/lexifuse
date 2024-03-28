import { Tabs } from 'expo-router';

const HomeLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'stats',
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'ranking',
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'market',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
