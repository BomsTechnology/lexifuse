import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { H6, SizableText, Theme, useTheme } from 'tamagui';

import Button from '../form/Button';

import colors from '~/src/constants/colors';
import { settingsWithStorage } from '~/src/utils/storage';
import { Title } from '~/tamagui.config';

const HelpBS = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [settings] = useAtom(settingsWithStorage);
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['55%', '70%', '85%'], []);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    }
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={{ paddingHorizontal: 20 }} bottomInset={25}>
        <Button
          onPress={() => {
            sheetRef.current?.dismiss();
          }}
          backgroundColor={colors.red1}
          borderBottomColor={colors.red1}
          color="#fff"
          enterStyle={{ opacity: 0, y: 50 }}
          animation="bouncy">
          Fermer
        </Button>
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: theme.gray1.get() }}
      handleIndicatorStyle={{ backgroundColor: theme.gray12.get() }}
      enablePanDownToClose
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onDismiss={() => setIsOpen(false)}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}>
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        <Theme name={settings.theme}>
          <Title>Aide</Title>
          <H6>Bienvenue dans Lexifuse: Le Défi des Synonymes!</H6>
          <SizableText fontWeight="700" mt={10}>
            Objectif du Jeu:
          </SizableText>
          <SizableText>
            Dans Lexifuse, votre mission est de tester et d'améliorer votre connaissance des
            synonymes. Vous serez présenté avec un mot et quatre options de synonymes possibles. À
            vous de choisir la bonne réponse pour marquer des points et progresser dans le jeu.
          </SizableText>
          <SizableText fontWeight="700" mt={10}>
            Comment Jouer:
          </SizableText>
          <SizableText mt={5}>
            Choisir un Niveau: Commencez par choisir le niveau de difficulté qui correspond à votre
            maîtrise des synonymes: Facile, Moyen ou Difficile.
          </SizableText>
          <SizableText> Découvrez le Mot: Vous serez présenté avec un mot de départ.</SizableText>
          <SizableText mt={5}>
            Sélectionnez le Synonyme Correct: Parmi les quatre options proposées, sélectionnez le
            synonyme qui correspond le mieux au mot donné.
          </SizableText>
          <SizableText mt={5}>
            Marquez des Points: Chaque réponse correcte vous rapporte des points. Essayez d'en
            accumuler autant que possible pour grimper dans les classements.
          </SizableText>
          <SizableText mt={5}>
            Utilisez les Bonus: Si vous êtes bloqué, utilisez l'un de nos bonus pour vous aider à
            trouver la réponse correcte.
          </SizableText>
          <SizableText mt={5}>
            Atteignez le Plus Haut Score: Votre objectif ultime est d'atteindre le plus haut score
            possible et de devenir un maître des synonymes!
          </SizableText>
          <SizableText fontWeight="700" mt={10}>
            Bonus Disponibles:
          </SizableText>
          <SizableText mt={5}>Indice: Obtenez un petit indice sur le synonyme correct.</SizableText>
          <SizableText mt={5}>
            Élimination: Supprimez deux options incorrectes, vous laissant avec un choix plus
            restreint.
          </SizableText>
          <SizableText fontWeight="700" mt={10}>
            Conseils pour la Victoire:
          </SizableText>
          <SizableText mt={5}>
            Lisez attentivement: Assurez-vous de bien comprendre le mot donné et les options de
            synonymes proposées.
          </SizableText>
          <SizableText mt={5}>
            Pensez aux Contextes: Parfois, le contexte peut vous aider à déterminer le synonyme le
            plus approprié.
          </SizableText>
          <SizableText mt={5}>
            Utilisez les Bonus Stratégiquement: Choisissez judicieusement quand utiliser vos bonus
            pour maximiser votre avantage.
          </SizableText>
          <SizableText mt={5}>
            Prêt à relever le défi des synonymes? Lancez-vous dans Lexifuse et montrez vos
            compétences linguistiques dès maintenant!
          </SizableText>
        </Theme>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default HelpBS;
