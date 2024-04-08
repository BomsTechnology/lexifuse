import { Feather, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { forwardRef, useState, useRef } from 'react';
import PagerView from 'react-native-pager-view';
import { useToast } from 'react-native-toast-notifications';
import { Circle, H2, ScrollView, SizableText, XStack, YStack } from 'tamagui';

import ErrorPage from '~/src/components/ErrorPage';
import Loading from '~/src/components/Loading';
import Piece from '~/src/components/Piece';
import AnswerBS from '~/src/components/bottomSheet/AnswerBS';
import BonusBS from '~/src/components/bottomSheet/BonusBS';
import Button from '~/src/components/form/Button';
import GameHeader from '~/src/components/header/GameHeader';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import { intializeWordStep, answerBgColor, answerBorderColor } from '~/src/functions/setupWords';
import i18n from '~/src/i18n';
import { getWords } from '~/src/services/useWord';
import WordProps from '~/src/types/WordProps';
import { currGameWithStorage, settingsWithStorage, userWithStorage } from '~/src/utils/storage';

type stepProps = WordProps & {
  stepWords: string[];
};

const Page = () => {
  const { level, language } = useLocalSearchParams();
  const [settings] = useAtom(settingsWithStorage);
  const [user, setUser] = useAtom(userWithStorage);
  const [game] = useAtom(currGameWithStorage);
  const router = useRouter();
  const toast = useToast();
  const currentStep = useRef<number>(1);
  const nbTrueAnswer = useRef<number>(0);
  const pageView = useRef<PagerView>(null);
  const [use50, setUse50] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenSheetKind, setIsOpenSheetKind] = useState(false);
  const [isOpenSheetAnswer, setIsOpenSheetAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [gameTable, setGameTable] = useState<stepProps[]>([]);

  const { isPending, error } = useQuery<WordProps[], Error>({
    queryKey: ['words'],
    queryFn: async () => {
      const data = await getWords({
        languageId: language as string,
        level: parseInt(level as string),
      });

      data.forEach((word) => {
        setGameTable((prev) => [...prev, { ...word, stepWords: intializeWordStep(word) }]);
      });
      return data;
    },
  });

  const onValidate = () => {
    if (currentAnswer === '') {
      toast.show(i18n.t('select_answer_error'), {
        type: 'danger',
        placement: 'top',
      });
      return;
    }
    if (!isValid) {
      setIsValid(true);
      if (currentAnswer === gameTable[currentStep.current - 1].answer) {
        setIsError(false);
        nbTrueAnswer.current = nbTrueAnswer.current + 1;
      } else {
        setIsError(true);
      }
      if (settings.library) {
        setTimeout(() => {
          setIsOpenSheetKind(true);
        }, 100);
      }
    } else if (!isOpenSheetKind) {
      goNext();
    }
  };

  const goNext = () => {
    setIsOpenSheetKind(false);
    setIsOpenSheetAnswer(false);
    if (currentStep.current < 10) {
      setIsValid(false);
      setIsError(false);
      setUse50(false);
      setCurrentAnswer('');
      pageView.current?.setPage(currentStep.current);
      currentStep.current = currentStep.current + 1;
    } else if (currentStep.current === 10) {
      router.replace({ pathname: '/finish', params: { nbTrueAnswer: nbTrueAnswer.current } });
    }
  };

  const bonus50 = () => {
    if (user.nb_pieces >= 2 && !use50) {
      setUser((prev) => ({
        ...prev,
        nb_pieces: prev.nb_pieces - 2,
      }));
      setUse50(true);
    } else {
      toast.show(i18n.t('piece_error'), {
        type: 'danger',
        placement: 'top',
      });
    }
  };

  const bonusAnswer = () => {
    if (user.nb_pieces >= 4 && !isOpenSheetAnswer) {
      setUser((prev) => ({
        ...prev,
        nb_pieces: prev.nb_pieces - 1,
      }));
      setIsOpenSheetAnswer(true);
    } else {
      toast.show(i18n.t('piece_error'), {
        type: 'danger',
        placement: 'top',
      });
    }
  };

  if (error) return <ErrorPage message={error.message || i18n.t('default_error_msg')} button />;
  if (isPending || gameTable.length === 0) return <Loading />;
  return (
    <>
      <Container>
        <GameHeader user={user} game={game} level={level as string} step={currentStep.current} />
        <Main justifyContent="space-between" pt={35}>
          <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
            {gameTable.length > 0 && (
              <PagerView initialPage={0} style={{ flex: 1 }} scrollEnabled={false} ref={pageView}>
                {gameTable.map((item, i) => (
                  <YStack mt={15} flex={1} key={i + 1}>
                    <SizableText textAlign="center" fontWeight="600" fontSize={20}>
                      {i18n.t('question_title')}
                    </SizableText>
                    <H2 textAlign="center" color={colors.blue1} mb={20}>
                      {item.word}
                    </H2>

                    <ScrollView
                      w="100%"
                      contentContainerStyle={{ alignItems: 'center', gap: 10, paddingTop: 20 }}>
                      {item.stepWords?.map((stepWord, index) => (
                        <AnswerButton
                          text={stepWord}
                          bgColor={answerBgColor(
                            currentStep.current,
                            i,
                            currentAnswer,
                            stepWord,
                            isValid,
                            isError,
                            item.answer,
                            use50,
                            index
                          )}
                          borderColor={answerBorderColor(
                            currentStep.current,
                            i,
                            currentAnswer,
                            stepWord,
                            isValid,
                            isError,
                            item.answer,
                            use50,
                            index
                          )}
                          textColor={
                            use50 && item.answer !== stepWord && index < 2
                              ? colors.gray3
                              : currentAnswer !== '' && currentAnswer === stepWord
                                ? '#fff'
                                : colors.orange1
                          }
                          key={index}
                          disabled={isValid || (use50 && item.answer !== stepWord && index < 2)}
                          icon={
                            isValid && isError && currentAnswer === stepWord
                              ? 'cross'
                              : isValid && isError && stepWord === item.answer
                                ? 'check'
                                : undefined
                          }
                          onPress={() => {
                            setCurrentAnswer(stepWord);
                          }}
                        />
                      ))}
                    </ScrollView>
                  </YStack>
                ))}
              </PagerView>
            )}
          </YStack>
          <YStack enterStyle={{ opacity: 0, y: 50 }} animation="bouncy">
            <XStack gap="$3" mb={10}>
              <BonusButton
                onPress={bonus50}
                text="50/50"
                pieces="2"
                icon={<Feather name="divide" size={24} color="#fff" />}
              />
              <BonusButton
                onPress={bonusAnswer}
                text={i18n.t('answer')}
                pieces="4"
                icon={<Ionicons name="bulb" size={24} color="#fff" />}
              />
            </XStack>
            <Button
              backgroundColor={colors.green1}
              borderBottomColor={colors.green2}
              color="#fff"
              onPress={() => onValidate()}>
              {isValid && currentStep.current === gameTable.length
                ? i18n.t('finish_part')
                : isValid
                  ? i18n.t('next')
                  : i18n.t('validate')}
            </Button>
          </YStack>
        </Main>
      </Container>
      <AnswerBS
        isOpen={isOpenSheetKind}
        setIsOpen={setIsOpenSheetKind}
        description={
          gameTable.length > 0 && gameTable[currentStep.current - 1].meaning
            ? gameTable[currentStep.current - 1].meaning
            : ''
        }
        text={
          gameTable.length > 0 && gameTable[currentStep.current - 1].word
            ? gameTable[currentStep.current - 1].word
            : ''
        }
        buttonAction={() => goNext()}
        textButton={isValid && currentStep.current === 10 ? i18n.t('finish_part') : i18n.t('next')}
      />

      <BonusBS
        isOpen={isOpenSheetAnswer}
        setIsOpen={setIsOpenSheetAnswer}
        text={gameTable.length > 0 ? gameTable[currentStep.current - 1].answer : ''}
      />
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
  disabled,
}: {
  icon?: string;
  text: string;
  onPress: () => void;
  bgColor: string;
  borderColor: string;
  textColor: string;
  disabled: boolean;
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
        disabled={disabled}
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
