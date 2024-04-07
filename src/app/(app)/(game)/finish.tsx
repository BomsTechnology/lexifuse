import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { H4, SizableText, XStack, YStack } from 'tamagui';

import Piece from '~/src/components/Piece';
import Button from '~/src/components/form/Button';
import Container from '~/src/components/layout/Container';
import colors from '~/src/constants/colors';
import { setGameUser } from '~/src/services/useGame';
import { LevelProps } from '~/src/types/LevelProps';
import { queryClient } from '~/src/utils/queryClient';
import { currGameWithStorage, userWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';

const Finish = () => {
  const { nbTrueAnswer } = useLocalSearchParams();
  const points = parseInt(nbTrueAnswer as string);
  const [user, setUser] = useAtom(userWithStorage);
  const [game, setGame] = useAtom(currGameWithStorage);
  const [goToNextLevel, setGoToNextLevel] = useState(false);
  const level: LevelProps = queryClient.getQueryData(['current_level'])!;
  const mutationGame = useMutation({
    mutationFn: () =>
      setGameUser({
        id_game: game.id,
        id_user: user.id,
        id_language: game.languages?.id!,
        nb_po: game.nb_points + points * 5,
        nb_pi: user.nb_pieces + points * 2,
        level_points: level.nb_points,
        next_level: game.level + 1,
      }),
    onSuccess: (data) => {
      if (data) {
        setGame({
          ...game,
          level: game.level + 1,
        });
        setGoToNextLevel(true);
      }
    },
  });

  useEffect(() => {
    setUser({
      ...user,
      nb_pieces: user.nb_pieces + points * 2,
    });
    setGame({
      ...game,
      nb_points: game.nb_points + points * 5,
    });
    mutationGame.mutate();
  }, []);

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
          <Title color="#fff">Partie terminée !</Title>
        </XStack>
        <YStack bg="$gray1" p={30} w="100%" borderRadius={30}>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={10}>
            <SizableText fontWeight="600" fontSize={16}>
              Bonnes réponses:
            </SizableText>
            <H4 color={colors.green1}>{points}</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={10}>
            <SizableText fontWeight="600" fontSize={16}>
              Mauvaises réponses:
            </SizableText>
            <H4 color={colors.red1}>{10 - points}</H4>
          </XStack>

          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" my={10}>
            <SizableText fontWeight="600" fontSize={16}>
              Points gagnés:
            </SizableText>
            <H4 color={colors.blue1}>{points * 5}</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={20}>
            <SizableText fontWeight="600" fontSize={16}>
              Pièces gagnées:
            </SizableText>
            <XStack alignItems="center" gap="$2">
              <Piece text="C" />
              <H4 color={colors.orange1}>{points * 2}</H4>
            </XStack>
          </XStack>
          {goToNextLevel && (
            <XStack w="100%" justifyContent="center">
              <SizableText textAlign="center">
                🔥 Félicitation vous passez au niveau suivant! 🔥
              </SizableText>
            </XStack>
          )}
          <Button
            backgroundColor={colors.green1}
            borderBottomColor={colors.green2}
            color="#fff"
            mt={20}>
            {goToNextLevel ? 'Niveau suivant' : 'Nouvelle partie'}
          </Button>
        </YStack>
      </YStack>
    </Container>
  );
};

export default Finish;
