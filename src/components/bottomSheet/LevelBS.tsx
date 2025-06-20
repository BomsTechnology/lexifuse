import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { Link } from 'expo-router';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { H2, H6, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';

const LevelBS = ({
  isOpen,
  setIsOpen,
  level,
  language,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  level: number;
  language: string;
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(level - 1);
  const snapPoints = useMemo(() => ['35%'], []);

  const levels = Array.from({ length: level - 1 }, (_, i) => i + 1);

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
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 15 }} bottomInset={10}>
        <Link
          href={{
            pathname: '/(app)/(game)/',
            params: { level: selectedLevel, language },
          }}
          replace
          asChild>
          <Button
            backgroundColor={colors.blue1}
            borderBottomColor={colors.blue2}
            color="#fff"
            enterStyle={{ opacity: 0, y: 50 }}
            animation="bouncy">
            <H6 lineHeight={16} color="#fff">
              {i18n.t('start_part')}
            </H6>
          </Button>
        </Link>
      </BottomSheetFooter>
    ),
    []
  );

  const Item = ({ l, active }: { l: string; active: boolean }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLevel(Number(l));
        }}
        style={[styles.bloc, { borderColor: active ? colors.blue1 : theme.gray10.get() }]}>
        <H2 color={active ? colors.blue1 : '$gray10'}>{l}</H2>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: theme.gray1.get() }}
      handleIndicatorStyle={{ backgroundColor: theme.gray12.get() }}
      enablePanDownToClose
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      bottomInset={20}
      detached
      onDismiss={() => setIsOpen(false)}
      style={{ marginHorizontal: 24 }}
      footerComponent={renderFooter}
      backdropComponent={renderBackdrop}>
      <BottomSheetFlatList
        data={levels}
        contentContainerStyle={styles.containerStyle}
        columnWrapperStyle={styles.wrapperStyle}
        style={{ flex: 1 }}
        numColumns={4}
        renderItem={({ item, index }) => (
          <Item l={(index + 1).toString()} active={index + 1 === selectedLevel} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    gap: 10,
  },
  containerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    paddingBottom: 100,
  },
  bloc: {
    width: 75,
    height: 60,
    borderRadius: 8,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LevelBS;
