import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {  useTheme } from 'tamagui';

import Button from '../form/Button';
import LanguageItem from '../listItem/LanguageItem';

import colors from '~/src/constants/colors';
import { createGame } from '~/src/services/useGame';
import { getLanguages } from '~/src/services/useLanguage';
import { GameProps } from '~/src/types/GameProps';
import { Database } from '~/src/types/database.types';

type Language = Database['public']['Tables']['languages']['Row'];
type User = Database['public']['Tables']['users']['Row'];
const LanguageBS = ({
  isOpen,
  setIsOpen,
  user,
  currGameStorage,
  gamesStorage,
  setCurrGameStorage,
  setGamesStorage,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User;
  currGameStorage: GameProps;
  gamesStorage: GameProps[];
  setCurrGameStorage: (value: GameProps) => void;
  setGamesStorage: (value: GameProps[]) => void;
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['35%'], []);
  const selectedLanguage = useRef<Language>({
    ...currGameStorage.languages!,
    path: '',
    created_at: '',
    iso_code: '',
  });
  const [selected, setSelected] = useState<Language>({
    ...currGameStorage.languages!,
    path: '',
    created_at: '',
    iso_code: '',
  });
  const { data } = useQuery<Language[], Error>({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
  const mutationGame = useMutation({
    mutationFn: () => createGame(user.id, selectedLanguage.current.id!),
    onSuccess: (data) => {
      setCurrGameStorage(data.game!);
      setGamesStorage([...gamesStorage, data.game!]);
      sheetRef.current?.dismiss();
    },
  });
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={mutationGame.isPending ? 'none' : 'close'}
      />
    ),
    []
  );

  const changeLanguage = async () => {
    const isThere = gamesStorage.find((game) => game.languages?.id === selectedLanguage.current.id);
    if (isThere) {
      sheetRef.current?.dismiss();
      setCurrGameStorage(isThere);
    } else {
      mutationGame.mutate();
    }
    
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    }
  }, [isOpen]);

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 15 }} bottomInset={10}>
        <Button
          onPress={changeLanguage}
          backgroundColor={colors.blue1}
          borderBottomColor={colors.blue2}
          loading={mutationGame.isPending}
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
      enablePanDownToClose={!mutationGame.isPending}
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
            active={selected.id === item.id}
            onPress={() => {
              setSelected(item);
              selectedLanguage.current = item;
            }}
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
