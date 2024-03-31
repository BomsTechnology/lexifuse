import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { forwardRef, useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { Circle, H2, ScrollView, SizableText, XStack, YStack } from 'tamagui';

import Loading from '~/src/components/Loading';
import Piece from '~/src/components/Piece';
import AnswerBS from '~/src/components/bottomSheet/AnswerBS';
import BonusBS from '~/src/components/bottomSheet/BonusBS';
import Button from '~/src/components/form/Button';
import GameHeader from '~/src/components/header/GameHeader';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';

const Page = () => {
  const router = useRouter();
  const toast = useToast();
  const navigation = useNavigation();
  const [isOpenSheetKind, setIsOpenSheetKind] = useState(false);
  const [isOpenSheetAnswer, setIsOpenSheetAnswer] = useState(false);
  return (
    <>
      <Container>
        <GameHeader />
        <Main justifyContent="space-between" pt={35}>
          <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
            <ScrollView flex={1} contentContainerStyle={{ alignItems: 'center' }}>
              <SizableText textAlign="center" fontWeight="600" fontSize={20}>
                Quel est le synonyme de:
              </SizableText>
              <H2 textAlign="center" mt={15} color={colors.blue1}>
                Rêve
              </H2>

              <YStack w="100%" mt={30} gap={15}>
                <AnswerButton
                  text="cauchemar"
                  bgColor={colors.orange3}
                  borderColor={colors.orange4}
                  textColor={colors.orange1}
                />
                <AnswerButton
                  text="cauchemar"
                  bgColor={colors.orange3}
                  borderColor={colors.orange4}
                  textColor={colors.orange1}
                />
                <AnswerButton
                  text="cauchemar"
                  bgColor={colors.orange3}
                  borderColor={colors.orange4}
                  textColor={colors.orange1}
                />
                <AnswerButton
                  text="cauchemar"
                  bgColor={colors.orange3}
                  borderColor={colors.orange4}
                  textColor={colors.orange1}
                />
              </YStack>
            </ScrollView>
          </YStack>
          <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
            <XStack gap="$3" mb={10}>
              <BonusButton
                onPress={() => {
                  toast.show("Hello World");
                }}
                text="50/50"
                pieces="2"
                icon={<Feather name="divide" size={24} color="#fff" />}
              />
              <BonusButton
                onPress={() => setIsOpenSheetAnswer(true)}
                text="réponse"
                pieces="4"
                icon={<Ionicons name="bulb" size={24} color="#fff" />}
              />
            </XStack>
            <Button
              backgroundColor={colors.green1}
              borderBottomColor={colors.green2}
              color="#fff"
              onPress={() => setIsOpenSheetKind(true)}>
              Valider
            </Button>
          </YStack>
        </Main>
      </Container>
      <AnswerBS
        isOpen={isOpenSheetKind}
        setIsOpen={setIsOpenSheetKind}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, repudiandae odio! Aliquam,
          ducimus. Non quisquam iste consectetur dicta natus sint sapiente tempore voluptatem vitae
          laudantium, totam nesciunt ab earum repudiandae!"
        text="Rêve"
        buttonAction={() => router.push('/finish')}
      />

      <BonusBS isOpen={isOpenSheetAnswer} setIsOpen={setIsOpenSheetAnswer} text="Utopie" />
    </>
  );
};

const AnswerButton = ({
  icon,
  text,
  onPress,
  bgColor,
  borderColor,
  textColor,
}: {
  icon?: string;
  text?: string;
  onPress?: () => void;
  bgColor: string;
  borderColor: string;
  textColor: string;
}) => {
  return (
    <XStack position="relative" flex={1} mx={10}>
      {icon && (
        <Circle size={25} position="absolute" top={-5} right={-5} zIndex={1} bg="$gray1">
          {icon === 'cross' ? (
            <Ionicons name="close-circle" size={23} color={colors.red1} />
          ) : (
            <Ionicons name="checkmark-circle" size={23} color={colors.green1} />
          )}
        </Circle>
      )}
      <Button
        size="$6"
        backgroundColor={bgColor}
        borderBottomColor={borderColor}
        flex={1}
        color={textColor}
        onPress={onPress}>
        {text}
      </Button>
    </XStack>
  );
};
const BonusButton = forwardRef(
  (
    {
      text,
      icon,
      onPress,
      pieces,
    }: {
      text: string;
      icon: JSX.Element;
      onPress?: () => void;
      pieces: string;
    },
    ref
  ) => {
    return (
      <XStack position="relative" flex={1}>
        <YStack position="absolute" top={-5} right={-5} zIndex={1}>
          <Piece text={pieces} />
        </YStack>
        <Button
          onPress={onPress}
          backgroundColor={colors.blue1}
          borderBottomColor={colors.blue2}
          borderBottomWidth={0}
          flex={1}
          color="#fff">
          {icon}
          {text}
        </Button>
      </XStack>
    );
  }
);

export default Page;
