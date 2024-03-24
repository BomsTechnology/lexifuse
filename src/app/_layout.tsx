import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import i18n from '../i18n/i18n';
import { localeWithStorage, themeWithStorage } from '../utils/storage';

import { queryClient } from '~/src/utils/queryClient';
import config from '~/tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [theme] = useAtom(themeWithStorage);
  const [locale] = useAtom(localeWithStorage);
  i18n.locale = locale;

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <JotaiProvider>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <Theme name={theme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="index"
                  options={{
                    title: 'Onboarding',
                  }}
                />
                <Stack.Screen
                  name="sign-in"
                  options={{
                    title: 'Sign In',
                  }}
                />
                <Stack.Screen
                  name="otp"
                  options={{
                    title: 'Otp',
                  }}
                />
                <Stack.Screen name="(app)" />
              </Stack>
            </Theme>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </TamaguiProvider>
    </JotaiProvider>
  );
}
