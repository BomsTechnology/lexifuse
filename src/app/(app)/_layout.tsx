import { Stack } from 'expo-router';
import { useOnlineManager } from '~/src/hooks/useOnlineManager';

const AppLayout = () => {
  useOnlineManager();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(game)" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AppLayout;
