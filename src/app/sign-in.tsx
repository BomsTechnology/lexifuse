import { Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Button, ButtonText } from '~/tamagui.config';

export default function Page() {
  return (
    <Container>
      <Main>
        <YStack>
          <Title>Sign In</Title>
        </YStack>
        <Link href={{ pathname: '/sign-up' }} asChild>
          <Button>
            <ButtonText>Go to sign up</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
