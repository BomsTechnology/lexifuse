import { Link } from 'expo-router';
import { H6, SizableText } from 'tamagui';

import Button from './form/Button';
import colors from '../constants/colors';
import i18n from '../i18n';

import { Container, Title } from '~/tamagui.config';

const ErrorPage = ({ message, button }: { message: string; button?: boolean }) => {
  return (
    <Container justifyContent="center" alignItems="center" gap="$5">
      <Title color="#fff">{i18n.t('error')}</Title>
      <SizableText color="#fff">{message}</SizableText>
      {button && button === true && (
        <Link
          href={{
            pathname: '/(app)/(home)/home/',
          }}
          replace
          asChild>
          <Button backgroundColor={colors.green1} borderBottomColor={colors.green2} color="#fff">
            <H6 lineHeight={16} color="#fff">
              {i18n.t('back_to_home')}
            </H6>
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default ErrorPage;
