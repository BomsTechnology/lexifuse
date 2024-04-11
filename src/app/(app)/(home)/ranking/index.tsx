import { Ionicons, Entypo } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useTheme, YStack, H6} from 'tamagui';

import Button from '~/src/components/form/Button';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import RankingItem from '~/src/components/listItem/RankingItem';
import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { getGamesByLanguage } from '~/src/services/useGame';
import { GameProps } from '~/src/types/GameProps';
import { currGameWithStorage, userWithStorage } from '~/src/utils/storage';
import { Subtitle, Title } from '~/tamagui.config';

const Page = () => {
  const [user] = useAtom(userWithStorage);
  const [game] = useAtom(currGameWithStorage);
  const aref = useRef<FlatList>(null);
  const theme = useTheme();
  const { data } = useQuery<GameProps[], Error>({
    queryKey: ['ranking', game.languages?.id],
    queryFn: () => getGamesByLanguage(game.languages?.id!),
  });
  const index = data?.findIndex((d) => d.users!.id === user.id);
  useEffect(() => {
    if (index !== undefined) {
      aref.current?.scrollToIndex({ index, animated: true });
    }
  }, [index]);
  return (
    <Container>
      <Title color="#fff" textAlign="center" mt={20} enterStyle={{ opacity: 0 }} animation="bouncy">
        {i18n.t('ranking')}
      </Title>
      <Main>
        <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
          {!user.auth_id ? (
            <YStack justifyContent="center" alignItems="center" gap="$5" flex={1}>
              <Subtitle textAlign="center">{i18n.t('ranking_no_login')}</Subtitle>
              <Link href={{ pathname: '/sign-in' }} asChild>
                <Button
                  backgroundColor={colors.orange1}
                  borderBottomColor={colors.orange2}
                  color="#fff"
                  w="100%">
                  <Ionicons name="person" size={20} color="#fff" />
                  <H6 lineHeight={16} color="#fff">
                    {i18n.t('login')}
                  </H6>
                </Button>
              </Link>
            </YStack>
          ) : data?.length! > 1 ? (
            <FlatList
              ref={aref}
              data={data}
              renderItem={({ item, index }) => (
                <RankingItem
                  index={index + 1}
                  name={item.users.username ? item.users.username : i18n.t('anonymous')}
                  score={item.nb_points}
                  you={user.id === item.users.id}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ padding: 20, gap: 10 }}
              style={{
                borderRadius: 30,
                backgroundColor: theme.gray5.get(),
              }}
            />
          ) : (
            <YStack flex={1} justifyContent="center" alignItems="center">
              <Entypo name="emoji-sad" size={50} color={colors.blue1} />
              <Title textAlign="center">{i18n.t('no_ranking')}</Title>
            </YStack>
          )}
        </YStack>
      </Main>
    </Container>
  );
};

export default Page;
