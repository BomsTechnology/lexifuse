import { Image, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { SizableText, XStack } from 'tamagui';

import colors from '../constants/colors';

const ProgressLevel = () => {
  const progress = useSharedValue(0);

  const handlePress = () => {
    progress.value = withSpring(progress.value + 10);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });
  return (
    <XStack bg="#fff" width={120} py="$1" px="$1" borderRadius="$8" position="relative">
      <View style={styles.textContainer}>
        <SizableText color="#fff" size="$2" fontFamily="$heading" textAlign="center">
          60/80
        </SizableText>
      </View>
      <XStack bg={colors.blue3} w="100%" borderRadius="$8" h="$1" overflow="hidden">
        <Animated.View style={[styles.progress, animatedStyles]} />
      </XStack>
      <View style={styles.starContainer}>
        <XStack position="relative">
          <View style={styles.textContainer}>
            <SizableText color="#fff" size="$3" textAlign="center" fontFamily="$heading">
              3
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
