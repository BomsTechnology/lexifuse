import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Button, H2, H6, SizableText, XStack, YStack } from 'tamagui';

import Piece from '../Piece';
import CustomModal from '../modal/CustomModal';

import colors from '~/src/constants/colors';
import { GameProps } from '~/src/types/GameProps';
import { Database } from '~/src/types/database.types';
import i18n from '~/src/i18n';

type UserProps = Database['public']['Tables']['users']['Row'];

const GameHeader = ({
  step,
  user,
  game,
  level,
}: {
  step: number;
  user: UserProps;
  game: GameProps;
  level: string;
}) => {
  const router = useRouter();

  const goBack = () => {
    router.replace('/(app)/(home)/home/');
  };
  return (
    <YStack px={20} py={5} enterStyle={{ opacity: 0, y: -10 }} animation="bouncy">
      <XStack alignItems="center" justifyContent="space-between">
        <CustomModal
          title={i18n.t('leave')}
          description={i18n.t('leave_message')}
          confirmText={i18n.t('continue')}
          cancelText={i18n.t('leave')}
          btnConfirmColor1={colors.green1}
          btnConfirmColor2={colors.green2}
          onCancel={goBack}>
          <Button unstyled alignItems="center" flexDirection="row">
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <SizableText color="#fff" fontWeight="600" fontSize={16}>
              {i18n.t('back')}
            </SizableText>
          </Button>
        </CustomModal>

        <YStack gap="$1" alignItems="flex-end">
          <Image source={{ uri: game.languages!.image }} style={{ width: 20, height: 12 }} />
          <XStack alignItems="center" gap="$2">
            <Piece text="C" />

            <H6 lineHeight={12} fontSize={14} color="#fff">
              {user.nb_pieces}
            </H6>
          </XStack>
        </YStack>
      </XStack>

      <H2 color="#fff" fontSize={35} mt={20}>
        {step}/10
      </H2>
      <SizableText color="rgba(255, 255, 255, 0.7)" fontWeight="600" fontSize={18}>
        {i18n.t('level', { level })}
      </SizableText>
    </YStack>
  );
};

export default GameHeader;
