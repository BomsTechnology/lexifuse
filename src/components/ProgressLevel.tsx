import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';
import { XStack } from 'tamagui';

import colors from '../constants/colors';
import i18n from '../i18n';
import { getLevelByLevelAndLanguage, goToNextLevel } from '../services/useLevel';
import { LevelProps } from '../types/LevelProps';
import { currGameWithStorage } from '../utils/storage';

const ProgressLevel = () => {
  const toast = useToast();
  const [game, setGame] = useAtom(currGameWithStorage);
  const mutationGame = useMutation({
    mutationFn: () =>
      goToNextLevel({
        id_language: game.languages!.id,
        next_level: game.level + 1,
      }),
    onSuccess: (data) => {
      if (data) {
        setGame({
          ...game,
          level: game.level + 1,
        });
        refetch();
      }
    },
    onError: (error) => {
      toast.show(error.message || i18n.t('default_error_msg'), {
        type: 'danger',
        placement: 'top',
      });
    },
  });
  const progress = useSharedValue(0);

  const { data, refetch } = useQuery<LevelProps, Error>({
    queryKey: ['current_level'],
    queryFn: () => {
      return getLevelByLevelAndLanguage({ level: game.level, language: game.languages!.id });
    },
  });

  useEffect(() => {
    progress.value = withSpring(game.nb_points);
    if (game.nb_points > data?.nb_points!) {
      mutationGame.mutate();
    }
  }, [game]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${(progress.value * 100) / (data?.nb_points || 1)}%`,
    };
  });
  return (
    <XStack bg="#fff" width={120} py="$1" px="$1" borderRadius="$8" position="relative">
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {game.nb_points}/{data?.nb_points}
        </Text>
      </View>
      <XStack bg={colors.blue3} w="100%" borderRadius="$8" h="$1" overflow="hidden">
        <Animated.View style={[styles.progress, animatedStyles]} />
      </XStack>
      <View style={styles.starContainer}>
        <XStack position="relative">
          <View style={styles.textContainer}>
            <Text style={styles.text}>{game.level}</Text>
          </View>

          <Image
            source={require('~/assets/images/star.png')}
            style={styles.star}
            resizeMode="contain"
          />
        </XStack>
      </View>
    </XStack>
  );
};

const styles = StyleSheet.create({
  progress: {
    backgroundColor: colors.blue1,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    width: '60%',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  starContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    width: 35,
    height: 35,
    marginTop: -2,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    height: 'auto',
  },
  text: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Bungee',
    textAlign: 'center',
  },
});

export default ProgressLevel;
