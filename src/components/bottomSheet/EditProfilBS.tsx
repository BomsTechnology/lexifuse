import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useEffect, useRef } from 'react';
import { Theme, useTheme, YStack } from 'tamagui';

import Button from '../form/Button';
import Input from '../form/Input';

import colors from '~/src/constants/colors';
import { settingsWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';

const EditProfilBS = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [settings] = useAtom(settingsWithStorage);
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['55%', '70%', '85%'], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );
  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    }
  }, [isOpen]);

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 20 }} bottomInset={25}>
        <Button
          backgroundColor={colors.green1}
          borderBottomColor={colors.green2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          Editer
        </Button>
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: theme.gray1.get() }}
      handleIndicatorStyle={{ backgroundColor: theme.gray12.get() }}
      enablePanDownToClose
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onDismiss={() => setIsOpen(false)}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}>
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <Theme name={settings.theme}>
          <Title>Editer mon profil</Title>
          <YStack bg="$gray5" p="$4" borderRadius="$10" my="$5" gap="$2">
            <Input
              backgroundColor="$gray1"
              placeholder="Nom d'utilisateur"
              color="$gray12"
              icon={<Ionicons name="person" size={20} color={theme.gray9.get()} />}
            />
            <Input
              backgroundColor="$gray1"
              placeholder="Mot de passe"
              color="$gray12"
              secureTextEntry
              icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
            />
            <Input
              backgroundColor="$gray1"
              placeholder="Confirmer le mot de passe"
              color="$gray12"
              secureTextEntry
              icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
            />
          </YStack>
        </Theme>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default EditProfilBS;
