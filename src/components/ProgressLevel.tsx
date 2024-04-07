import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { SizableText, XStack } from 'tamagui';

import colors from '../constants/colors';
import { getLevelByLevelAndLanguage } from '../services/useLevel';
import { LevelProps } from '../types/LevelProps';

const ProgressLevel = ({
  progression,
  level,
  language,
}: {
  progression: number;
  level: number;
  language: string;
}) => {
  const progress = useSharedValue(0);

  const { data } = useQuery<LevelProps, Error>({
    queryKey: ['current_level'],
    queryFn: () => {
      return getLevelByLevelAndLanguage({ level, language });
    },
  });

  useEffect(() => {
    progress.value = withSpring(progression);
  }, [progression]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${(progress.value * 100) / (data?.nb_points || 1)}%`,
    };
  });
  return (
    <XStack bg="#fff" width={120} py="$1" px="$1" borderRadius="$8" position="relative">
      <View style={styles.textContainer}>
        <SizableText color="#fff" size="$2" fontFamily="$heading" textAlign="center">
          {progression}/{data?.nb_points}
        </SizableText>
      </View>
      <XStack bg={colors.blue3} w="100%" borderRadius="$8" h="$1" overflow="hidden">
        <Animated.View style={[styles.progress, animatedStyles]} />
      </XStack>
      <View style={styles.starContainer}>
        <XStack position="relative">
          <View style={styles.textContainer}>
            <SizableText color="#fff" size="$3" textAlign="center" fontFamily="$heading">
              {level}
            </SizableText>
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
  },
});

export default ProgressLevel;
