import { Ionicons } from '@expo/vector-icons';
import { Button, H2, SizableText, XStack, YStack } from 'tamagui';

import Piece from '../Piece';
import CustomModal from '../modal/CustomModal';

import colors from '~/src/constants/colors';

const GameHeader = () => {
  return (
    <YStack px={20} py={5} enterStyle={{ opacity: 0, y: -10 }} animation="bouncy">
      <XStack alignItems="center" justifyContent="space-between">
        <CustomModal
          title="Quitter"
          description="Voulez-vous vraiment quitter
                  cette partie ?"
          confirmText="Continuer"
          cancelText="Quitter"
          btnConfirmColor1={colors.green1}
          btnConfirmColor2={colors.green2}>
          <Button unstyled alignItems="center" flexDirection="row">
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <SizableText color="#fff" fontWeight="600" fontSize={16}>
              Retour
            </SizableText>
          </Button>
        </CustomModal>

        <XStack alignItems="center" gap="$2">
          <Piece text="C" />
          <SizableText color="#fff" size="$4" fontFamily="$heading">
            240
          </SizableText>
        </XStack>
      </XStack>

      <H2 color="#fff" fontSize={35} mt={20}>
        1/10
      </H2>
      <SizableText color="rgba(255, 255, 255, 0.7)" fontWeight="600" fontSize={18}>
        Niveau 12
      </SizableText>
    </YStack>
  );
};

export default GameHeader;
