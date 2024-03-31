import { Ionicons } from '@expo/vector-icons';
import { H5, SizableText, Square, XStack, YStack } from 'tamagui';

import Piece from '../Piece';

import colors from '~/src/constants/colors';

const SettingHeader = () => {
  return (
    <XStack
      px={20}
      py={10}
      justifyContent="space-between"
      alignItems="center"
      enterStyle={{ opacity: 0 }}
      animation="bouncy">
      <XStack alignItems="center" gap="$3" flex={1}>
        <Square bg={colors.gray2} h={60} w={60} borderRadius="$6">
          <Ionicons name="person" size={40} color={colors.orange1} />
        </Square>
        <YStack>
          <H5 color="#fff" numberOfLines={1}>
            Florent
          </H5>
          <SizableText color={colors.gray2} fontWeight="600">
            Niveau 3
          </SizableText>
        </YStack>
      </XStack>
      <YStack alignItems="flex-end" gap="$1">
        <XStack alignItems="center" gap="$2">
          <Piece text="C" />
          <SizableText color="#fff" size="$4" fontFamily="$heading">
            240
          </SizableText>
        </XStack>
        <SizableText fontWeight="800" fontSize="$5" color={colors.green1}>
          5469 pts
        </SizableText>
      </YStack>
    </XStack>
  );
};

export default SettingHeader;
