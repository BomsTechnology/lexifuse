import { Foundation } from '@expo/vector-icons';
import { View } from 'react-native';
import { H4, SizableText, XStack } from 'tamagui';

import colors from '~/src/constants/colors';

type RankingItemProps = {
  index: number;
  id?: string;
  name?: string;
  score?: number;
};
const RankingItem = ({ index, id, name, score }: RankingItemProps) => {
  return (
    <XStack
      flex={1}
      h={50}
      w="100%"
      px={15}
      bg={
        index === 1
          ? colors.orange1
          : index === 2
            ? colors.blue1
            : index === 3
              ? colors.green1
              : index === 8
                ? '$gray12'
                : '$gray1'
      }
      borderRadius="$4"
      justifyContent="space-between"
      alignItems="center">
      <XStack alignItems="center" gap={10} maxWidth="70%">
        <XStack alignItems="center" gap={2}>
          {index === 1 ? (
            <Foundation name="arrow-up" size={14} color={colors.green1} />
          ) : index === 2 ? (
            <Foundation name="arrow-down" size={14} color={colors.red1} />
          ) : (
            <View style={{ width: 8, height: 14 }} />
          )}
          <H4
            color={
              index === 1 || index === 2 || index === 3
                ? '#fff'
                : index === 8
                  ? '$gray1'
                  : '$gray10'
            }>
            {index}
          </H4>
        </XStack>
        <SizableText
          fontWeight="500"
          maxWidth="80%"
          numberOfLines={1}
          color={
            index === 1 || index === 2 || index === 3 ? '#fff' : index === 8 ? '$gray1' : '$gray12'
          }>{`${index === 8 ? name + ' (Vous)' : name}`}</SizableText>
      </XStack>
      <SizableText
        fontWeight="600"
        style={{ textAlign: 'center' }}
        color={
          index === 1 || index === 2 || index === 3
            ? '#fff'
            : index === 8
              ? colors.green1
              : colors.blue1
        }>{`${score} pts`}</SizableText>
    </XStack>
  );
};

export default RankingItem;
