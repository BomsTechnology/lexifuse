import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';

const HomeLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
      }}>
      <Tabs.Screen
        name="feed/index"
        options={{
          title: 'Feed',
        }}
      />
      <Tabs.Screen
        name="users/index"
        options={{
          title: 'Users',
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="quizz/index"
        options={{
          title: 'Quizz',
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
