import { getLocales } from 'expo-localization';

import { atomWithMMKV } from './atomWithMMKV';
import SettingProps from '../types/SettingProps';
import { Database } from '../types/database.types';
import { GameProps } from '../types/GameProps';

export const settingsWithStorage = atomWithMMKV<SettingProps>('settings', {
  sound: true,
  theme: 'light',
  notification: true,
  language: getLocales()[0].languageCode === 'fr' ? 'fr' : 'en',
  library: true,
});

export const userWithStorage = atomWithMMKV<Database['public']['Tables']['users']['Row']>('user', {
  type: 'user',
  nb_pieces: 10,
  email: null,
  username: null,
  created_at: '',
  id: '',
  auth_id: null,
});

export const currGameWithStorage = atomWithMMKV<GameProps>('game', {
  id: '',
  level: 0,
  nb_points: 0,
  users: null,
  languages: null,
});

export const gamesWithStorage = atomWithMMKV<GameProps[]>('games', []);
