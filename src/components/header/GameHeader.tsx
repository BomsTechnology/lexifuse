import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Button, H2, SizableText, XStack, YStack } from 'tamagui';

import Piece from '../Piece';
import CustomModal from '../modal/CustomModal';

import colors from '~/src/constants/colors';
import { GameProps } from '~/src/types/GameProps';
import { Database } from '~/src/types/database.types';

type UserProps = Database['public']['Tables']['users']['Row'];

const GameHeader = ({ step, user, game }: { step: number; user: UserProps; game: GameProps }) => {
  const router = useRouter();

  const goBack = () => {
    router.replace('/(app)/(home)/home/');
  };
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
          btnConfirmColor2={colors.green2}
          onCancel={goBack}>
          <Button unstyled alignItems="center" flexDirection="row">
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <SizableText color="#fff" fontWeight="600" fontSize={16}>
              Retour
            </SizableText>
          </Button>
        </CustomModal>

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

      <H2 color="#fff" fontSize={35} mt={20}>
        {step}/10
      </H2>
      <SizableText color="rgba(255, 255, 255, 0.7)" fontWeight="600" fontSize={18}>
        Niveau {game.level}
      </SizableText>
    </YStack>
  );
};

export default GameHeader;
