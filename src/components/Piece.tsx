import { View, StyleSheet, Image } from 'react-native';
import { SizableText, XStack } from 'tamagui';

const Piece = ({ text, size = 25 }: { text: string; size?: number }) => {
  return (
    <XStack position="relative" h={size} w={size}>
      <Image
        source={require('~/assets/images/piece.png')}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <SizableText color="#fff" size="$3" textAlign="center" fontFamily="$heading">
          {text}
        </SizableText>
      </View>
    </XStack>
  );
};

const styles = StyleSheet.create({
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

export default Piece;
