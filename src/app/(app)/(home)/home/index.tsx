import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { H1, YStack } from 'tamagui';

import LevelBS from '~/src/components/bottomSheet/LevelBS';
import Button from '~/src/components/form/Button';
import HomeHeader from '~/src/components/header/HomeHeader';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { currGameWithStorage, userWithStorage } from '~/src/utils/storage';
import { Subtitle } from '~/tamagui.config';

const Page = () => {
  const [user] = useAtom(userWithStorage);
  const [game] = useAtom(currGameWithStorage);
  const [isOldLevel, setIsOldLevel] = useState<boolean>(false);
  return (
    <>
      <Container>
        <HomeHeader user={user} game={game} />
        <Main>
          {!user.auth_id && game.level > 1 && (
            <Link href={{ pathname: '/sign-in' }} asChild>
              <Button
                backgroundColor={colors.orange1}
                borderBottomColor={colors.orange2}
                color="#fff">
                <Ionicons name="person" size={20} color="#fff" />
                {i18n.t('login')}
              </Button>
            </Link>
          )}
          <YStack
            justifyContent="center"
            alignItems="center"
            flex={1}
            enterStyle={{ opacity: 0, scale: 0.5 }}
            animation="bouncy">
            <Subtitle>{i18n.t('you_are_level')}</Subtitle>
            <H1 size="$14" color={colors.blue1}>
              {game.level}
            </H1>
          </YStack>

          <YStack gap="$2" enterStyle={{ opacity: 0, y: 100 }} animation="bouncy">
            {game.level > 1 ? (
              <Button
                onPress={() => setIsOldLevel(true)}
                backgroundColor={colors.blue1}
                borderBottomColor={colors.blue2}
                color="#fff">
                {i18n.t('previous_level')}
              </Button>
            ) : (
              <Link href={{ pathname: '/sign-in' }} asChild>
                <Button
                  backgroundColor={colors.orange1}
                  borderBottomColor={colors.orange2}
                  color="#fff">
                  <Ionicons name="person" size={20} color="#fff" />
                  {i18n.t('login')}
                </Button>
              </Link>
            )}
            <Link
              href={{
                pathname: '/(app)/(game)/',
                params: { level: game.level, language: game.languages?.id! },
              }}
              replace
              asChild>
              <Button
                backgroundColor={colors.green1}
                borderBottomColor={colors.green2}
                color="#fff">
                <Ionicons name="add-circle" size={28} color="#fff" />
                {i18n.t('new_part')}
              </Button>
            </Link>
          </YStack>
        </Main>
      </Container>
      <LevelBS
        isOpen={isOldLevel}
        level={game.level}
        language={game.languages?.id!}
        setIsOpen={setIsOldLevel}
      />
    </>
  );
};

export default Page;
