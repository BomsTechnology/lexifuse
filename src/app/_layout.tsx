import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';
import {
  Exo_300Light,
  Exo_600SemiBold,
  Exo_700Bold,
  Exo_800ExtraBold,
  Exo_900Black,
  Exo_400Regular,
  Exo_500Medium,
} from '@expo-google-fonts/exo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider, focusManager } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider } from 'jotai';
import { useEffect } from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import { TamaguiProvider } from 'tamagui';

import RootStack from '../components/RootStack';
import Splash from '../components/Splash';
import { useAppState } from '../hooks/useAppState';

import { queryClient } from '~/src/utils/queryClient';
import config from '~/tamagui.config';

SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function Root() {
  const [loaded] = useFonts({
    Bungee: Bungee_400Regular,
    Exo300: Exo_300Light,
    Exo600: Exo_600SemiBold,
    Exo700: Exo_700Bold,
    Exo800: Exo_800ExtraBold,
    Exo900: Exo_900Black,
    Exo400: Exo_400Regular,
    Exo500: Exo_500Medium,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useAppState(onAppStateChange);

  if (!loaded) return <Splash />;

  return (
    <JotaiProvider>
      <TamaguiProvider config={config}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <ToastProvider>
                <RootStack />
              </ToastProvider>
              <StatusBar style="light" />
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </TamaguiProvider>
    </JotaiProvider>
  );
}
