import { Link } from 'expo-router';
import { SizableText } from 'tamagui';

import Button from './form/Button';
import colors from '../constants/colors';

import { Container, Title } from '~/tamagui.config';

const ErrorPage = ({ message, button }: { message: string; button?: boolean }) => {
  return (
    <Container justifyContent="center" alignItems="center" gap="$5">
      <Title color="#fff">Erreur</Title>
      <SizableText color="#fff">{message}</SizableText>
      <Link
        href={{
          pathname: '/(app)/(home)/home/',
        }}
        replace
        asChild>
        {button && button === true && (
          <Button backgroundColor={colors.green1} borderBottomColor={colors.green2} color="#fff">
            Back to Home
          </Button>
        )}
      </Link>
    </Container>
  );
};

export default ErrorPage;
