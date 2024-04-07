import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { FlatList } from 'react-native';
import { useTheme, YStack } from 'tamagui';
import Button from '~/src/components/form/Button';

import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import RankingItem from '~/src/components/listItem/RankingItem';
import colors from '~/src/constants/colors';
import { userWithStorage } from '~/src/utils/storage';
import { Subtitle, Title } from '~/tamagui.config';

const ITEM_COUNT = 100;

const Page = () => {
  const [user] = useAtom(userWithStorage);
  const aref = useRef<FlatList>(null);
  const theme = useTheme();
  const items = Array.from(Array(ITEM_COUNT).keys());
  return (
    <Container>
      <Title color="#fff" textAlign="center" mt={20} enterStyle={{ opacity: 0 }} animation="bouncy">
        Classement
      </Title>
      <Main>
        <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
          {user.auth_id ? (
            <FlatList
              ref={aref}
              data={items}
              renderItem={({ item, index }) => (
                <RankingItem
                  index={index + 1}
                  name="Test"
                  score={items.length * (items.length - index)}
                  id={index.toString()}
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
            <YStack justifyContent="center" alignItems="center" gap="$5" flex={1}>
              <Subtitle textAlign="center">
                Connectez-vous à votre compte pour voir votre classement.
              </Subtitle>
              <Link href={{ pathname: '/sign-in' }} asChild>
                <Button
                  backgroundColor={colors.orange1}
                  borderBottomColor={colors.orange2}
                  color="#fff"
                  w="100%">
                  <Ionicons name="person" size={20} color="#fff" />
                  Se Connecter
                </Button>
              </Link>
            </YStack>
          )}
        </YStack>
      </Main>
    </Container>
  );
};

export default Page;
