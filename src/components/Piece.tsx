import { View, StyleSheet, Image, Text } from 'react-native';
import { XStack } from 'tamagui';

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
        <Text style={styles.text}>{text}</Text>
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
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Bungee',
    textAlign: 'center',
    lineHeight: 12,
  },
});

export default Piece;
