import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useMemo, useRef, useEffect, useCallback } from 'react';
import { H3, SizableText, XStack, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';

const BonusBS = ({
  isOpen,
  setIsOpen,
  text,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  text: string;
}) => {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    }
  }, [isOpen]);

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

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 15 }} bottomInset={10}>
        <Button
          onPress={() => {
            sheetRef.current?.dismiss();
          }}
          backgroundColor={colors.red1}
          borderBottomColor={colors.red2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          Fermer
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
      index={0}
      snapPoints={snapPoints}
      bottomInset={25}
      detached
      style={{ marginHorizontal: 24 }}
      onDismiss={() => setIsOpen(false)}
      footerComponent={renderFooter}
      backdropComponent={renderBackdrop}>
      <BottomSheetScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, alignItems: 'center' }}>
        <H3 textAlign="center" color={theme.gray12.get()}>
          Réponse
        </H3>
        <XStack alignItems="center" mt={20} gap="$2" flexWrap="wrap" justifyContent="center">
          <SizableText fontWeight="600" color={theme.gray12.get()} textAlign="center">
            la bonne réponse est:
          </SizableText>
          <SizableText
            fontWeight="600"
            fontFamily="$heading"
            color={colors.orange1}
            textAlign="center">
            {text}
          </SizableText>
        </XStack>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BonusBS;
