import { Foundation, Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useEffect, useRef, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { SizableText, ScrollView, YStack, useTheme } from 'tamagui';

import EditProfilBS from '~/src/components/bottomSheet/EditProfilBS';
import HelpBS from '~/src/components/bottomSheet/HelpBS';
import LanguageBS from '~/src/components/bottomSheet/LanguageBS';
import SettingHeader from '~/src/components/header/SettingHeader';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import SettingListItem from '~/src/components/listItem/SettingListItem';
import SettingListItemWithSwitch from '~/src/components/listItem/SettingListItemWithSwitch';
import CustomModal from '~/src/components/modal/CustomModal';
import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { logout } from '~/src/services/useAuth';
import { queryClient } from '~/src/utils/queryClient';
import {
  currGameWithStorage,
  gamesWithStorage,
  settingsWithStorage,
  userWithStorage,
} from '~/src/utils/storage';

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useAtom(userWithStorage);
  const [settings, setSettings] = useAtom(settingsWithStorage);
  const [currGameStorage, setCurrGameStorage] = useAtom(currGameWithStorage);
  const [gamesStorage, setGamesStorage] = useAtom(gamesWithStorage);
  const theme = useTheme();
  const [isOpenEditProfil, setIsOpenEditProfil] = useState<boolean>(false);
  const [isOpenHelp, setIsOpenHelp] = useState<boolean>(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);
  const refreshKey = useRef(0);

  useEffect(() => {
    refreshKey.current += 1;
    setIsOpenLanguage(false);
    queryClient.invalidateQueries({ queryKey: ['current_level'] });
    queryClient.invalidateQueries({ queryKey: ['ranking'] });
  }, [gamesStorage, currGameStorage]);

  const mutationUser = useMutation({
    mutationFn: () => logout(),
    onSuccess: (res) => {
      setUser(RESET);
      setGamesStorage(RESET);
      setCurrGameStorage(RESET);
      setSettings(RESET);

      toast.show(i18n.t('logout_success'), {
        type: 'success',
        placement: 'top',
      });

      router.replace('/sign-in');
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });

  return (
    <>
      <Container>
        {user.auth_id && <SettingHeader user={user} />}
        <Main>
          <ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <SizableText fontWeight="600" fontSize={18}>
                {i18n.t('options')}
              </SizableText>
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                {user.auth_id && (
                  <SettingListItem
                    onPress={() => setIsOpenEditProfil(true)}
                    icon={<Ionicons name="person" size={20} color={colors.blue1} />}
                    text={i18n.t('username')}
                    rightText={user.username!}
                  />
                )}
                <SettingListItem
                  onPress={() => setIsOpenLanguage(true)}
                  icon={<Ionicons name="language-sharp" size={20} color={colors.green1} />}
                  text={i18n.t('game_language')}
                  rightText={i18n.t(currGameStorage.languages?.name!.toLocaleLowerCase()!)}
                />
                <SettingListItemWithSwitch
                  icon={
                    <Ionicons
                      name={settings.sound ? 'volume-high' : 'volume-mute'}
                      size={20}
                      color={theme.gray10.get()}
                    />
                  }
                  text={i18n.t('sound')}
                  onValueChange={() => setSettings({ ...settings, sound: !settings.sound })}
                  value={settings.sound}
                />
                <SettingListItemWithSwitch
                  icon={
                    <Ionicons
                      name={settings.theme === 'dark' ? 'moon' : 'sunny'}
                      size={20}
                      color={theme.gray10.get()}
                    />
                  }
                  text={`${i18n.t('theme')} ${settings.theme === 'dark' ? i18n.t('dark') : i18n.t('light')}`}
                  onValueChange={() =>
                    setSettings({
                      ...settings,
                      theme: settings.theme === 'dark' ? 'light' : 'dark',
                    })
                  }
                  value={settings.theme === 'dark'}
                />
                <SettingListItemWithSwitch
                  icon={<Ionicons name="notifications" size={20} color={theme.gray10.get()} />}
                  text={i18n.t('notifications')}
                  onValueChange={() =>
                    setSettings({ ...settings, notification: !settings.notification })
                  }
                  value={settings.notification}
                />
                <SettingListItemWithSwitch
                  icon={<Ionicons name="book" size={20} color={theme.gray10.get()} />}
                  text={i18n.t('dictionary')}
                  onValueChange={() => setSettings({ ...settings, library: !settings.library })}
                  value={settings.library}
                />
              </YStack>
            </YStack>

            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <SizableText fontWeight="600" fontSize={18} mt={30}>
                {i18n.t('share')}
              </SizableText>
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                <SettingListItem
                  icon={<Ionicons name="star" size={20} color={colors.orange1} />}
                  text={i18n.t('evalute', { name: 'SidoLex' })}
                />
                <SettingListItem
                  icon={<Ionicons name="arrow-redo-sharp" size={20} color={colors.blue1} />}
                  text={i18n.t('invite_friends')}
                  onPress={async () => await Sharing.shareAsync('https://lexifuse.com')}
                />
              </YStack>
            </YStack>

            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                <SettingListItem
                  onPress={() => setIsOpenHelp(true)}
                  icon={<Ionicons name="help" size={20} color={colors.green1} />}
                  text={i18n.t('help')}
                />

                {user.auth_id && (
                  <CustomModal
                    title={i18n.t('logout')}
                    description={i18n.t('logout_message')}
                    confirmText={i18n.t('confirm')}
                    onConfirm={mutationUser.mutate}
                    cancelText={i18n.t('cancel')}>
                    <SettingListItem
                      icon={<Foundation name="arrow-down" size={20} color={colors.red1} />}
                      text={i18n.t('logout')}
                      textColor={colors.red1}
                    />
                  </CustomModal>
                )}
              </YStack>
            </YStack>
          </ScrollView>
        </Main>
      </Container>
      <EditProfilBS isOpen={isOpenEditProfil} setIsOpen={setIsOpenEditProfil} />
      <LanguageBS
        isOpen={isOpenLanguage}
        setIsOpen={setIsOpenLanguage}
        user={user}
        currGameStorage={currGameStorage}
        gamesStorage={gamesStorage}
        setCurrGameStorage={setCurrGameStorage}
        setGamesStorage={setGamesStorage}
        key={refreshKey.current}
      />
      <HelpBS isOpen={isOpenHelp} setIsOpen={setIsOpenHelp} />
    </>
  );
};

export default Page;
