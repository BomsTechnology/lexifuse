import { getLocales } from 'expo-localization';
import { ThemeName } from 'tamagui';

import { atomWithMMKV } from './atomWithMMKV';

export const localeWithStorage = atomWithMMKV<string>(
  'locale',
  getLocales()[0].languageCode === 'fr' ? 'fr' : 'en'
);

export const themeWithStorage = atomWithMMKV<ThemeName>('theme', 'light');
