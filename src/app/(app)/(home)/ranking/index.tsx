import { useRef } from 'react';
import { FlatList } from 'react-native';
import { useTheme, YStack } from 'tamagui';

import Container from '~/src/components/layout/Container';
import Main from '~/src/components/layout/Main';
import RankingItem from '~/src/components/listItem/RankingItem';
import { Title } from '~/tamagui.config';

const ITEM_COUNT = 100;

const Page = () => {
  const aref = useRef<FlatList>(null);
  const theme = useTheme();
  const items = Array.from(Array(ITEM_COUNT).keys());
  return (
    <Container>
      <Title color="#fff" textAlign="center" mt={20} enterStyle={{ opacity: 0 }} animation="bouncy">
        Classement
      </Title>
      <Main>
        <YStack enterStyle={{ opacity: 0, scale: 0.5 }} animation="bouncy" flex={1}>
          <FlatList
            ref={aref}
            data={items}
            renderItem={({ item, index }) => (
              <RankingItem
                index={index + 1}
                name="Test"
                score={items.length * (items.length - index)}
                id={index.toString()}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ padding: 20, gap: 10 }}
            style={{
              borderRadius: 30,
              backgroundColor: theme.gray5.get(),
            }}
          />
        </YStack>
      </Main>
    </Container>
  );
};

export default Page;
