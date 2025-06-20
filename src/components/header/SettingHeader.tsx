import { useAtom } from 'jotai';
import { Image } from 'react-native';
import { H5, H6, SizableText, Square, XStack, YStack } from 'tamagui';

import Piece from '../Piece';

import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { Database } from '~/src/types/database.types';
import { currGameWithStorage } from '~/src/utils/storage';

const SettingHeader = ({ user }: { user: Database['public']['Tables']['users']['Row'] }) => {
  const [game] = useAtom(currGameWithStorage);
  return (
    <XStack
      px={20}
      py={10}
      justifyContent="space-between"
      alignItems="center"
      enterStyle={{ opacity: 0 }}
      animation="bouncy">
      <XStack alignItems="center" gap="$3" flex={1}>
        <Square bg={colors.gray2} h={60} w={60} borderRadius="$6" overflow="hidden">
          <Image
            source={{ uri: game.languages!.image }}
            style={{ width: '100%', height: '100%' }}
          />
        </Square>
        <YStack>
          <H5 color="#fff" numberOfLines={1}>
            {user.username}
          </H5>
          <SizableText color={colors.gray2} fontWeight="600">
            {i18n.t('level', { level: game.level })}
          </SizableText>
        </YStack>
      </XStack>
      <YStack alignItems="flex-end" gap="$1">
        <XStack alignItems="center" gap="$2">
          <Piece text="C" />
          <H6 lineHeight={12} fontSize={14} color="#fff">
            {user.nb_pieces}
          </H6>
        </XStack>
        <SizableText fontWeight="800" fontSize="$5" color={colors.green1}>
          {game.nb_points} pts
        </SizableText>
      </YStack>
    </XStack>
  );
};

export default SettingHeader;
