import { getLocales } from 'expo-localization';

import { atomWithMMKV } from './atomWithMMKV';
import SettingProps from '../types/SettingProps';
import { Database } from '../types/database.types';

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
});

export const currGameWithStorage = atomWithMMKV<Database['public']['Tables']['games']['Row']>(
  'game',
  {
    id: '',
    user_id: '',
    language_id: '',
    level: 0,
    nb_points: 0,
    created_at: '',
  }
);

export const gamesWithStorage = atomWithMMKV<Database['public']['Tables']['games']['Row'][]>(
  'games',
  []
);
