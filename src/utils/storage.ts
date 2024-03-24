import { getLocales } from 'expo-localization';

import { atomWithMMKV } from './atomWithMMKV';

export const localeWithStorage = atomWithMMKV<string>(
  'locale',
  getLocales()[0].languageCode === 'fr' ? 'fr' : 'en'
);

export const themeWithStorage = atomWithMMKV<string>('theme', 'light');
