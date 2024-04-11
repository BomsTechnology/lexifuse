import { Audio } from 'expo-av';
import { Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Theme } from 'tamagui';

import Splash from './Splash';
import i18n from '../i18n';
import { settingsWithStorage } from '../utils/storage';

const RootStack = () => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [settings] = useAtom(settingsWithStorage);
  i18n.locale = settings.language;

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(require('~/assets/audio/background.mp3'));
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.5);
    setSound(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  if (settings.sound) {
    if (sound) {
      sound.playAsync();
    }
  } else {
    if (sound) {
      sound?.stopAsync();
    }
  }

  if (!sound) {
    return <Splash />;
  }
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
