import { Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Button, ButtonText } from '~/tamagui.config';

export default function Page() {
  return (
    <Container>
      <Main>
        <YStack>
          <Title>Onboarding</Title>
        </YStack>
        <Link href={{ pathname: '/sign-in' }} asChild>
          <Button>
            <ButtonText>Go to Sign In</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
