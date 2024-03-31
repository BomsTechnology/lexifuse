import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { YStack, XStack, useTheme } from 'tamagui';

import Button from '~/src/components/form/Button';
import Input from '~/src/components/form/Input';
import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import { Title, Subtitle } from '~/tamagui.config';

export default function SingIn() {
  const theme = useTheme();
  return (
    <Container bg="$gray1">
      <Main justifyContent="space-between" borderRadius={0} mt={0}>
        <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy">
          <Title>Connexion</Title>
          <Subtitle mt="$2">Entrez vos identifiants pour accéder à votre compte.</Subtitle>
          <YStack bg="$gray5" p="$4" borderRadius="$10" my="$5" gap="$2">
            <Input
              backgroundColor="$gray1"
              placeholder="Nom d'utilisateur"
              color="$gray12"
              icon={<Ionicons name="person" size={20} color={theme.gray9.get()} />}
            />
            <Input
              backgroundColor="$gray1"
              placeholder="Mot de passe"
              color="$gray12"
              secureTextEntry
              icon={<Ionicons name="lock-closed" size={20} color={theme.gray9.get()} />}
            />
          </YStack>
          <XStack flexWrap="wrap" gap="$2">
            <Subtitle color="$gray12">Je n'ai pas de compte,</Subtitle>
            <Link href={{ pathname: '/sign-up' }} asChild>
              <Subtitle color={colors.blue1}>m'inscrire</Subtitle>
            </Link>
          </XStack>
        </YStack>
        <Link href={{ pathname: '/sign-up' }} asChild>
          <Button
            backgroundColor={colors.green1}
            borderBottomColor={colors.green2}
            color="#fff"
            enterStyle={{ opacity: 0, y: 50 }}
            animation="bouncy">
            Se connecter
          </Button>
        </Link>
      </Main>
      <StatusBar style="dark" />
    </Container>
  );
}
