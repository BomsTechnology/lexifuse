import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SizableText, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';

const languages = [
  {
    id: 0,
    name: 'Français',
    icon: 'https://cdn.pixabay.com/photo/2015/11/20/18/55/french-flag-1053711_1280.png',
  },
  {
    id: 1,
    name: 'Anglais',
    icon: 'https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392_1280.png',
  },
];

const LanguageBS = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['35%'], []);
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

  const LanguageItem = ({
    id,
    name,
    icon,
    active,
  }: {
    id: number;
    name: string;
    icon: string;
    active: boolean;
  }) => {
    return (
      <TouchableOpacity style={styles.imageContainerStyle}>
        <Image
          source={{ uri: icon }}
          style={[styles.imageStyle, { borderColor: active ? colors.blue1 : 'transparent' }]}
          resizeMode="cover"
        />
        <SizableText fontWeight="600" color={active ? colors.blue1 : '$gray10'}>
          {name}
        </SizableText>
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
        data={languages}
        contentContainerStyle={styles.containerStyle}
        columnWrapperStyle={styles.wrapperStyle}
        style={{ flex: 1 }}
        numColumns={4}
        renderItem={({ item }) => (
          <LanguageItem id={item.id} name={item.name} icon={item.icon} active={item.id === 0} />
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
  imageContainerStyle: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 65,
    height: 45,
    borderRadius: 8,
    borderWidth: 4,
  },
});

export default LanguageBS;
