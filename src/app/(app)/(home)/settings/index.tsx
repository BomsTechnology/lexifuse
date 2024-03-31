import { Foundation, Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useAtom } from 'jotai';
import { useState } from 'react';
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
import { settingsWithStorage } from '~/src/utils/storage';

const Page = () => {
  const [settings, setSettings] = useAtom(settingsWithStorage);
  const theme = useTheme();
  const [isOpenEditProfil, setIsOpenEditProfil] = useState<boolean>(false);
  const [isOpenHelp, setIsOpenHelp] = useState<boolean>(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);

  return (
    <>
      <Container>
        <SettingHeader />
        <Main>
          <ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <SizableText fontWeight="600" fontSize={18}>
                Options
              </SizableText>
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                <SettingListItem
                  onPress={() => setIsOpenEditProfil(true)}
                  icon={<Ionicons name="person" size={20} color={colors.blue1} />}
                  text="Nom d'utilisateur"
                  rightText="Florent"
                />
                <SettingListItem
                  onPress={() => setIsOpenLanguage(true)}
                  icon={<Ionicons name="language-sharp" size={20} color={colors.green1} />}
                  text="Langue de jeu"
                  rightText="Français"
                />
                <SettingListItemWithSwitch
                  icon={
                    <Ionicons
                      name={settings.sound ? 'volume-high' : 'volume-mute'}
                      size={20}
                      color={theme.gray10.get()}
                    />
                  }
                  text="Sons"
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
                  text={`Theme ${settings.theme === 'dark' ? 'Sombre' : 'Clair'}`}
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
                  text="Notifications"
                  onValueChange={() =>
                    setSettings({ ...settings, notification: !settings.notification })
                  }
                  value={settings.notification}
                />
                <SettingListItemWithSwitch
                  icon={<Ionicons name="book" size={20} color={theme.gray10.get()} />}
                  text="Dictionnaire"
                  onValueChange={() => setSettings({ ...settings, library: !settings.library })}
                  value={settings.library}
                />
              </YStack>
            </YStack>

            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <SizableText fontWeight="600" fontSize={18} mt={30}>
                Partager
              </SizableText>
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                <SettingListItem
                  icon={<Ionicons name="star" size={20} color={colors.orange1} />}
                  text="Evaluer Lexifuse"
                />
                <SettingListItem
                  icon={<Ionicons name="arrow-redo-sharp" size={20} color={colors.blue1} />}
                  text="Inviter des amis"
                  onPress={async () => await Sharing.shareAsync('https://lexifuse.com')}
                />
              </YStack>
            </YStack>

            <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
              <YStack gap={7} p={18} bg="$gray5" borderRadius="$10" mt={15}>
                <SettingListItem
                  onPress={() => setIsOpenHelp(true)}
                  icon={<Ionicons name="help" size={20} color={colors.green1} />}
                  text="Aide"
                />

                <CustomModal
                  title="Déconnexion"
                  description="Voulez-vous vous deconnecter de votre compte ?"
                  confirmText="Confirmer"
                  cancelText="Annuler">
                  <SettingListItem
                    icon={<Foundation name="arrow-down" size={20} color={colors.red1} />}
                    text="Déconnexion"
                    textColor={colors.red1}
                  />
                </CustomModal>
              </YStack>
            </YStack>
          </ScrollView>
        </Main>
      </Container>
      <EditProfilBS isOpen={isOpenEditProfil} setIsOpen={setIsOpenEditProfil} />
      <LanguageBS isOpen={isOpenLanguage} setIsOpen={setIsOpenLanguage} />
      <HelpBS isOpen={isOpenHelp} setIsOpen={setIsOpenHelp} />
    </>
  );
};

export default Page;
