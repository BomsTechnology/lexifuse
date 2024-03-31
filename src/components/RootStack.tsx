import { Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { Theme } from 'tamagui';

import i18n from '../i18n';
import { settingsWithStorage } from '../utils/storage';

const RootStack = () => {
  const [settings] = useAtom(settingsWithStorage);
  i18n.locale = settings.language;
  return (
    <Theme name={settings.theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(app)" />
      </Stack>
    </Theme>
  );
};

export default RootStack;
