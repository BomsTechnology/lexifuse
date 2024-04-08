import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { H6, SizableText, Theme, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';
import { settingsWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';
import i18n from '~/src/i18n';

const HelpBS = ({
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
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 20 }} bottomInset={25}>
        <Button
          onPress={() => {
            sheetRef.current?.dismiss();
          }}
          backgroundColor={colors.red1}
          borderBottomColor={colors.red1}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          {i18n.t('close')}
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
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <Theme name={settings.theme}>
          <Title>{i18n.t('help')}</Title>
          <H6>{i18n.t('help_title', { name: 'SidoLex' })}</H6>
          <SizableText fontWeight="700" mt={10}>
            {i18n.t('help_t_1')}
          </SizableText>
          <SizableText>{i18n.t('help_p1_1', { name: 'SidoLex' })}</SizableText>
          <SizableText fontWeight="700" mt={10}>
            {i18n.t('help_t_2')}
          </SizableText>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((l, i) => (
            <SizableText mt={5} key={i}>
              {i18n.t(`help_p2_${i + 1}`)}
            </SizableText>
          ))}
          <SizableText fontWeight="700" mt={10}>
            {i18n.t('help_t_3')}
          </SizableText>
          {Array.from({ length: 2 }, (_, i) => i + 1).map((l, i) => (
            <SizableText mt={5} key={i}>
              {i18n.t(`help_p3_${l}`)}
            </SizableText>
          ))}
          <SizableText fontWeight="700" mt={10}>
            {i18n.t('help_t_4')}
          </SizableText>
          {Array.from({ length: 3 }, (_, i) => i + 1).map((l, i) => (
            <SizableText mt={5} key={i}>
              {i18n.t(`help_p4_${l}`)}
            </SizableText>
          ))}
          <SizableText>{i18n.t('help_p4_4', { name: 'SidoLex' })}</SizableText>
        </Theme>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default HelpBS;
