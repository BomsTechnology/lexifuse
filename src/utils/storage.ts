import { getLocales } from 'expo-localization';

import { atomWithMMKV } from './atomWithMMKV';
import SettingProps from '../types/SettingProps';


export const settingsWithStorage = atomWithMMKV<SettingProps>('settings', {
  sound: false,
  theme: 'light',
  notification: true,
  language: getLocales()[0].languageCode === 'fr' ? 'fr' : 'en',
  library: true,});
