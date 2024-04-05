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
    if (settings.sound) await sound.playAsync();
    setSound(sound);
  }

  async function unloadSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  }

  useEffect(() => {
    loadSound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (settings.sound) {
      loadSound();
    } else {
      unloadSound();
    }
  }, [settings.sound]);

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
