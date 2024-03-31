import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui, styled, SizableText, H1, YStack, createFont, Stack } from 'tamagui';

import colors from './src/constants/colors';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const headingFont = createInterFont();

const bungeeFont = createFont({
  family: 'Bungee',
  size: headingFont.size,
  weight: {
    5: '400',
  },
  letterSpacing: headingFont.letterSpacing,
  lineHeight: headingFont.lineHeight,
  face: {
    400: { normal: 'Bungee' },
  },
});

const exoFont = createFont({
  family: 'Exo',
  size: headingFont.size,
  weight: {
    4: '300',
    5: '400',
    6: '500',
    7: '600',
    8: '700',
    9: '800',
    10: '900',
  },
  letterSpacing: headingFont.letterSpacing,
  lineHeight: headingFont.lineHeight,
  face: {
    300: { normal: 'Exo300' },
    400: { normal: 'Exo400' },
    500: { normal: 'Exo500' },
    600: { normal: 'Exo600' },
    700: { normal: 'Exo700' },
    800: { normal: 'Exo800' },
    900: { normal: 'Exo900' },
  },
});

export const Container = styled(YStack, {
  flex: 1,
  backgroundColor: colors.blue1,
});

export const Main = styled(YStack, {
  flex: 1,
  padding: 20,
  backgroundColor: '$gray1',
  marginTop: 10,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
  paddingBottom: 40,
});

export const Title = styled(H1, {
  color: colors.blue1,
  fontSize: 30,
});

export const Subtitle = styled(SizableText, {
  color: '$gray8',
  fontSize: 18,
  fontWeight: '600',
});

export const Button = styled(YStack, {
  alignItems: 'center',
  backgroundColor: '#6366F1',
  borderRadius: 28,
  hoverStyle: {
    backgroundColor: '#5a5fcf',
  },
  justifyContent: 'center',
  maxWidth: 500,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

export const ButtonText = styled(SizableText, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
});


const Frame = styled(Stack, {
  width: 40,
  height: 20,
  borderRadius: 5,
  padding: 2,
  variants: {
    checked: {
      true: {
        backgroundColor: colors.green1,
      },
      false: {
        backgroundColor: '$gray8',
      },
    },
  } as const,
  defaultVariants: {
    checked: false,
  },
});

const config = createTamagui({
  light: {
    color: {
      primaryGreen: '#65D777',
    },
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: exoFont,
    heading: bungeeFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
