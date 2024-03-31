import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { H4, SizableText, XStack, YStack } from 'tamagui';

import Piece from '~/src/components/Piece';
import Button from '~/src/components/form/Button';
import Container from '~/src/components/layout/Container';
import colors from '~/src/constants/colors';
import { Title } from '~/tamagui.config';

const Finish = () => {
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
            <H4 color={colors.green1}>7</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={10}>
            <SizableText fontWeight="600" fontSize={16}>
              Mauvaises réponses:
            </SizableText>
            <H4 color={colors.red1}>3</H4>
          </XStack>

          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" my={10}>
            <SizableText fontWeight="600" fontSize={16}>
              Points gagnés:
            </SizableText>
            <H4 color={colors.blue1}>21</H4>
          </XStack>
          <XStack w="100%" justifyContent="space-between" px={30} alignItems="center" mb={20}>
            <SizableText fontWeight="600" fontSize={16}>
              Pièces gagnées:
            </SizableText>
            <XStack alignItems="center" gap="$2">
              <Piece text="C" />
              <H4 color={colors.orange1}>20</H4>
            </XStack>
          </XStack>
          <Button
            backgroundColor={colors.green1}
            borderBottomColor={colors.green2}
            color="#fff"
            mt={20}>
            Nouvelle partie
          </Button>
        </YStack>
      </YStack>
    </Container>
  );
};

export default Finish;
