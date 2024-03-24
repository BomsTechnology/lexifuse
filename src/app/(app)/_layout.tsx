import { Drawer } from 'expo-router/drawer';
const AppLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen
        name="(home)"
        options={{
          drawerLabel: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile/index"
        options={{
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="post/index"
        options={{
          title: 'Post',
        }}
      />
      <Drawer.Screen
        name="setting/index"
        options={{
          title: 'setting',
        }}
      />
      <Drawer.Screen
        name="organizer/index"
        options={{
          title: 'organizer',
        }}
      />
    </Drawer>
  );
};

export default AppLayout;
