import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { H3, SizableText } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';

const AnswerBS = ({
  isOpen,
  setIsOpen,
  text,
  description,
  buttonAction,
  textButton,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  text: string;
  description: string;
  buttonAction: () => void;
  textButton: string;
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['35%'], []);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    }
  }, [isOpen]);

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 20 }} bottomInset={25}>
        <Button
          onPress={() => {
            sheetRef.current?.dismiss();
            buttonAction();
          }}
          backgroundColor={colors.blue1}
          borderBottomColor={colors.blue2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          {textButton}
        </Button>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: colors.orange1 }}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      enablePanDownToClose
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={() => setIsOpen(false)}
      footerComponent={renderFooter}>
      <BottomSheetScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, alignItems: 'center' }}>
        <H3 color="#fff" textAlign="center">
          {text}
        </H3>
        <SizableText color="#fff" fontWeight="600" textAlign="center" mt={10}>
          {description}
        </SizableText>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default AnswerBS;
