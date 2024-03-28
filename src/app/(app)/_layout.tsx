import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(game)" />
    </Stack>
  );
};

export default AppLayout;
