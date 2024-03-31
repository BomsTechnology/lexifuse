import { ThemeName } from 'tamagui';

export default interface SettingProps {
  sound: boolean;
  theme: ThemeName;
  notification: boolean;
  language: 'fr' | 'en';
  library: boolean;
}
