import { SizableText, XStack } from 'tamagui';

import Piece from '../Piece';
import ProgressLevel from '../ProgressLevel';

const HomeHeader = () => {
  return (
    <XStack
      px={20}
      py={10}
      justifyContent="space-between"
      alignItems="center"
      enterStyle={{ opacity: 0 }}
      animation="bouncy">
      <ProgressLevel />
      <XStack alignItems="center" gap="$2">
        <Piece text="C" />
        <SizableText color="#fff" size="$4" fontFamily="$heading">
          240
        </SizableText>
      </XStack>
    </XStack>
  );
};

export default HomeHeader;
