import { Image } from 'react-native';
import { SizableText, XStack, YStack } from 'tamagui';

import Piece from '../Piece';
import ProgressLevel from '../ProgressLevel';

import { GameProps } from '~/src/types/GameProps';
import { Database } from '~/src/types/database.types';

type UserProps = Database['public']['Tables']['users']['Row'];

const HomeHeader = ({ user, game }: { user: UserProps; game: GameProps }) => {
  return (
    <XStack
      px={20}
      py={10}
      justifyContent="space-between"
      alignItems="center"
      enterStyle={{ opacity: 0 }}
      animation="bouncy">
      <ProgressLevel
        progression={game.nb_points}
        level={game.level}
        language={game.languages!.id}
      />
      <YStack gap="$1" alignItems="flex-end">
        <Image source={{ uri: game.languages!.image }} style={{ width: 20, height: 12 }} />
        <XStack alignItems="center" gap="$2">
          <Piece text="C" />

          <SizableText color="#fff" size="$4" fontFamily="$heading">
            {user.nb_pieces}
          </SizableText>
        </XStack>
      </YStack>
    </XStack>
  );
};

export default HomeHeader;
