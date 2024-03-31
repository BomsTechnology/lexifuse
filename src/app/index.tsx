import { Link } from 'expo-router';

import Button from '../components/form/Button';
import Container from '../components/layout/Container';
import Main from '../components/layout/Main';
import colors from '../constants/colors';

import { Title } from '~/tamagui.config';


export default function Page() {
  return (
    <Container>
      <Main justifyContent="space-between">
        <Title>Onboarding</Title>
        <Link href={{ pathname: '/(app)/sign-in' }} asChild>
          <Button backgroundColor={colors.green1} borderBottomColor={colors.green2} color="#fff">
            Go to Sign In
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
