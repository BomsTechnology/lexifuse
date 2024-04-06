import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SizableText, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';
import LanguageItem from '../listItem/LanguageItem';
import { useQuery } from '@tanstack/react-query';
import { getLanguages } from '~/src/services/useLanguage';
import { Database } from '~/src/types/database.types';
import { useAtom } from 'jotai';
import { currGameWithStorage, gamesWithStorage } from '~/src/utils/storage';

type Language = Database['public']['Tables']['languages']['Row'];
const LanguageBS = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [currGameStorage, setCurrGameStorage] = useAtom(currGameWithStorage);
  const [, setGamesStorage] = useAtom(gamesWithStorage);
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['35%'], []);
  const [selected, setSelected] = useState<Language>({
    ...currGameStorage.languages!,
    path: '',
    created_at: '',
  });
  const { data } = useQuery<Language[], Error>({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
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
        <Button
          onPress={() => {
            sheetRef.current?.dismiss();
          }}
          backgroundColor={colors.blue1}
          borderBottomColor={colors.blue2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          Changer
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
      bottomInset={20}
      detached
      onDismiss={() => setIsOpen(false)}
      style={{ marginHorizontal: 24 }}
      footerComponent={renderFooter}
      backdropComponent={renderBackdrop}>
      <BottomSheetFlatList
        data={data}
        contentContainerStyle={styles.containerStyle}
        columnWrapperStyle={styles.wrapperStyle}
        style={{ flex: 1 }}
        numColumns={4}
        renderItem={({ item }) => (
          <LanguageItem
          language={item}
          active={selected?.id === item.id}
          onPress={() => setSelected(item)}
          />
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
    justifyContent: 'center',
    gap: 20,
  },
  containerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    paddingBottom: 100,
  },
});

export default LanguageBS;
