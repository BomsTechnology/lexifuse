import { Ionicons } from '@expo/vector-icons';

import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import { Title } from '~/tamagui.config';

const Page = () => {
  return (
    <Container>
      <Main justifyContent="center" alignItems="center">
        <Ionicons name="storefront" size={50} color={colors.blue1} />
        <Title textAlign="center">Market</Title>
        <Title textAlign="center">Comming Soon</Title>
      </Main>
    </Container>
  );
};

export default Page;
