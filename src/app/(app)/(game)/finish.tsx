import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { H4, H6, SizableText, XStack, YStack } from 'tamagui';

import Piece from '~/src/components/Piece';
import Button from '~/src/components/form/Button';
import Container from '~/src/components/layout/Container';
import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { setGameUser } from '~/src/services/useGame';
import { LevelProps } from '~/src/types/LevelProps';
import { queryClient } from '~/src/utils/queryClient';
import { currGameWithStorage, gamesWithStorage, userWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';

const Finish = () => {
  const toast = useToast();
  const { nbTrueAnswer } = useLocalSearchParams();
  const points = parseInt(nbTrueAnswer as string);
  const [user, setUser] = useAtom(userWithStorage);
  const [game, setGame] = useAtom(currGameWithStorage);
  const [gamesStorage, setGamesStorage] = useAtom(gamesWithStorage);
  const [goToNextLevel, setGoToNextLevel] = useState(false);
  const level: LevelProps = queryClient.getQueryData(['current_level'])!;
  const newPoints = game.nb_points + points * 5;
  const newPieces = user.nb_pieces + points;
  const mutationGame = useMutation({
    mutationFn: () =>
      setGameUser({
        id_game: game.id,
        id_user: user.id,
        id_language: game.languages?.id!,
        nb_po: newPoints,
        nb_pi: newPieces,
        level_points: level.nb_points,
        next_level: game.level + 1,
      }),
    onSuccess: (data) => {
      replaceGamesStore();
      setUser({
        ...user,
        nb_pieces: newPieces,
      });
      if (data) {
        setGame({
          ...game,
          level: game.level + 1,
        });
        setGoToNextLevel(true);
      }
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });

  useEffect(() => {
    mutationGame.mutateAsync();
  }, []);

  const replaceGamesStore = () => {
    const newArray = gamesStorage.map((item) => {
      if (item.id === game.id) {
        const newGame = {
          ...game,
          nb_points: newPoints,
        };
        setGame(newGame);
        return newGame;
      }
      return item;
    });
    setGamesStorage(newArray);
  };

  return (
    <Container>
      <XStack w="100%" justifyContent="flex-end" px={20} py={10}>
        <Link href={{ pathname: '/(app)/(home)/home' }} replace asChild>
          <Pressable>
            <Ionicons name="close" size={40} color="white" />
          </Pressable>
        </Link>
      </XStack>

      <YStack flex={1} justifyContent="center">
        <XStack w="100%" px={30}>
          <Title color="#fff">{i18n.t('finish_part')}</Title>
        </XStack>
        <YStack bg="$gray1" p={30} w="100%" borderRadius={30}>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={10}>
            <SizableText fontWeight="600" fontSize={16}>
              {i18n.t('good_answer')}
            </SizableText>
            <H4 color={colors.green1}>{points}</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={10}>
            <SizableText fontWeight="600" fontSize={16}>
              {i18n.t('bad_answer')}
            </SizableText>
            <H4 color={colors.red1}>{10 - points}</H4>
          </XStack>

          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" my={10}>
            <SizableText fontWeight="600" fontSize={16}>
              {i18n.t('won_points')}
            </SizableText>
            <H4 color={colors.blue1}>{points * 5}</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={20}>
            <SizableText fontWeight="600" fontSize={16}>
              {i18n.t('won_coins')}
            </SizableText>
            <XStack alignItems="center" gap="$2">
              <Piece text="C" />
              <H4 color={colors.orange1}>{points}</H4>
            </XStack>
          </XStack>
          {goToNextLevel && (
            <XStack w="100%" justifyContent="center">
              <SizableText textAlign="center">{i18n.t('congratulations_next_level')}</SizableText>
            </XStack>
          )}
          <Link
            href={{
              pathname: '/(app)/(game)/',
              params: {
                level: goToNextLevel ? game.level + 1 : game.level,
                language: game.languages?.id!,
              },
            }}
            replace
            asChild>
            <Button
              backgroundColor={colors.green1}
              borderBottomColor={colors.green2}
              color="#fff"
              mt={20}>
              <H6 lineHeight={16} color="#fff">
                {goToNextLevel ? i18n.t('won_next_level') : i18n.t('new_part')}
              </H6>
            </Button>
          </Link>
        </YStack>
      </YStack>
    </Container>
  );
};

export default Finish;
