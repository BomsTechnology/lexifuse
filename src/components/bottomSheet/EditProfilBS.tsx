import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useEffect, useRef } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import { H6, Theme, useTheme, YStack } from 'tamagui';

import Button from '../form/Button';
import Input from '../form/Input';

import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { updateUser } from '~/src/services/useAuth';
import { settingsWithStorage, userWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';

const EditProfilBS = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const toast = useToast();
  const [settings] = useAtom(settingsWithStorage);
  const [user, setUser] = useAtom(userWithStorage);
  const { control, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
    },
  });
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['55%', '70%', '85%'], []);
  const onSubmit = (data: FieldValues) => {
    mutationUser.mutate({
      password: data.password,
      username: data.username,
      user_id: user && user.id ? user.id : '',
    });
  };
  const mutationUser = useMutation({
    mutationFn: ({
      password,
      username,
      user_id,
    }: {
      password: string;
      username: string;
      user_id: string;
    }) => updateUser(password, username, user_id),
    onSuccess: (res) => {
      setUser(res!);
      sheetRef.current?.dismiss();
      setValue('password', '');
      toast.show(i18n.t('profile_edited'), {
        type: 'success',
        placement: 'top',
      });
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={mutationUser.isPending ? 'none' : 'close'}
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
          loading={mutationUser.isPending}
          disabled={mutationUser.isPending}
          onPress={handleSubmit(onSubmit)}
          backgroundColor={colors.green1}
          borderBottomColor={colors.green2}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          <H6 lineHeight={16} color="#fff">
            {i18n.t('edit')}
          </H6>
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
          <Title>{i18n.t('edit_profile')}</Title>
          <YStack bg="$gray5" p="$4" borderRadius="$10" my="$5" gap="$2">
            <Input
              backgroundColor="$gray1"
              placeholder={i18n.t('username')}
              color="$gray12"
              name="username"
              control={control}
              icon={<Ionicons name="person" size={20} color={theme.gray9.get()} />}
              rules={{
                required: i18n.t('required_error', { field: i18n.t('username') }),
              }}
            />
            <Input
              backgroundColor="$gray3"
              placeholder={i18n.t('email')}
              color="$gray10"
              name="email"
              disabled
              control={control}
              rules={{
                required: i18n.t('required_error', { field: i18n.t('email') }),
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: i18n.t('email_error'),
                },
              }}
              icon={<Ionicons name="at" size={20} color={theme.gray9.get()} />}
            />
            <Input
              backgroundColor="$gray1"
              placeholder="Mot de passe"
              color="$gray12"
              name="password"
              control={control}
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
