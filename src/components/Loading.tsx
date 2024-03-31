import {  ActivityIndicator } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';

import Container from './layout/Container';
import Main from './layout/Main';
import colors from '../constants/colors';

const Loading = () => {
  return (
    <Container>
      <Main
        mt={0}
        backgroundColor={colors.blue1}
        justifyContent="space-between"
        alignItems="center">
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$5">
          <XStack alignItems="center">
            <SizableText color="#fff" size="$10" fontFamily="$heading">
              Lexi
            </SizableText>
            <SizableText fontWeight="600" fontSize={50} lineHeight={80} color={colors.orange1}>
              Fuse
            </SizableText>
          </XStack>
          <ActivityIndicator size="large" color="#fff" />
        </YStack>
        <SizableText color="#fff" fontFamily="$heading">
          Chargement...
        </SizableText>
      </Main>
    </Container>
  );
};

export default Loading;
