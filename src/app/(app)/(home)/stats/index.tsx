import { MaterialIcons } from '@expo/vector-icons';

import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import colors from '~/src/constants/colors';
import { Title } from '~/tamagui.config';

const Page = () => {
  return (
    <Container>
      <Main justifyContent="center" alignItems="center">
        <MaterialIcons name="bar-chart" size={70} color={colors.blue1} />
        <Title textAlign="center">Stats</Title>
        <Title textAlign="center">Comming Soon</Title>
      </Main>
    </Container>
  );
};

export default Page;
