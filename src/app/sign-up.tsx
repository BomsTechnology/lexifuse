import { Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Button, ButtonText } from '~/tamagui.config';

export default function Page() {
  return (
    <Container>
      <Main>
        <YStack>
          <Title>Sing - up </Title>
        </YStack>
        <Link href={{ pathname: '/(app)/(game)/' }} asChild>
          <Button>
            <ButtonText>Go to Home</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
