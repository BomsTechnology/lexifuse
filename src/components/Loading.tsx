import { ActivityIndicator, Image } from 'react-native';
import { SizableText, Spinner, YStack } from 'tamagui';

import Container from './layout/Container';
import Main from './layout/Main';
import colors from '../constants/colors';
import i18n from '../i18n';

const Loading = () => {
  return (
    <Container>
      <Main
        mt={0}
        backgroundColor={colors.blue1}
        justifyContent="space-between"
        alignItems="center">
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$5">
          <Image
            source={require('~/assets/images/logo.png')}
            resizeMode="contain"
            style={{ width: 120, height: 120 }}
          />
          <ActivityIndicator size="large" color="#fff" />
        </YStack>
        <SizableText color="#fff" fontFamily="$heading">
          {i18n.t('loading')}...
        </SizableText>
      </Main>
    </Container>
  );
};

export default Loading;
