import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useRouter, Redirect } from 'expo-router';
import { atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { SizableText, XStack, YStack } from 'tamagui';

import Splash from '../components/Splash';
import Button from '../components/form/Button';
import Container from '../components/layout/Container';
import Main from '../components/layout/Main';
import LanguageItem from '../components/listItem/LanguageItem';
import colors from '../constants/colors';
import { createGame } from '../services/useGame';
import { getLanguages } from '../services/useLanguage';
import { Database } from '../types/database.types';
import { currGameWithStorage, userWithStorage } from '../utils/storage';

import { Subtitle, Title } from '~/tamagui.config';

type Language = Database['public']['Tables']['languages']['Row'];
const asyncAtom = atom(async (get) => get(userWithStorage));
const loadableAtom = loadable(asyncAtom);

export default function Page() {
  const toast = useToast();
  const [, setUserStorage] = useAtom(userWithStorage);
  const [, setCurrGameStorage] = useAtom(currGameWithStorage);
  const [userStorage] = useAtom(loadableAtom);
  const router = useRouter();
  const [selected, setSelected] = useState<Language | null>(null);
  const { isPending, error, data } = useQuery<Language[], Error>({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });

  const mutationGame = useMutation({
    mutationFn: (userId: string) => createGame(userId, selected?.id!),
    onSuccess: (data) => {
      setCurrGameStorage(data.game!);
      setUserStorage(data.user!);
      router.replace('/(app)/(home)/home/');
    },
  });

  if (error || userStorage.state === 'hasError')
    return (
      <Container justifyContent="center" alignItems="center">
        <SizableText color="#fff">{error!.message || 'Une erreur est survenue'}</SizableText>
      </Container>
    );

  if (isPending || userStorage.state === 'loading') return <Splash />;

  if (userStorage.data.id !== '') {
    return <Redirect href="/(app)/(home)/home" />;
  }
  const start = () => {
    if (!selected) {
      toast.show('Veuillez sélectionner une langue', {
        type: 'danger',
        placement: 'top',
      });
      return;
    }
    mutationGame.mutate(userStorage.data.id);
  };
  return (
    <Container>
      <Main justifyContent="space-between" gap="$5" borderRadius={0} mt={0}>
        <YStack>
          <Title>Langue</Title>
          <Subtitle mt="$2">Selectionnez votre langue de jeu.</Subtitle>
        </YStack>
        <YStack>
          <FlatList
            data={data}
            contentContainerStyle={styles.containerStyle}
            columnWrapperStyle={styles.wrapperStyle}
            numColumns={2}
            renderItem={({ item, index }) => (
              <LanguageItem
                language={item}
                active={selected?.id === item.id}
                width={80}
                height={60}
                onPress={() => setSelected(item)}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </YStack>

        <YStack gap="$3">
          <XStack justifyContent="center" flexWrap="wrap" gap="$2">
            <Subtitle color="$gray12">J'ai deja un compte,</Subtitle>
            <Link href={{ pathname: `/(app)/sign-in` }} asChild>
              <Subtitle color={colors.blue1}>me connecter</Subtitle>
            </Link>
          </XStack>

          <Button
            onPress={start}
            backgroundColor={colors.green1}
            borderBottomColor={colors.green2}
            loading={mutationGame.isPending}
            disabled={mutationGame.isPending}
            color="#fff">
            Start
          </Button>
        </YStack>
      </Main>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    width: '100%',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
  containerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    paddingBottom: 100,
  },
});
