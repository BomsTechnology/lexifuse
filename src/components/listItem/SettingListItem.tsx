import { Ionicons } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { SizableText, XStack, Button, ColorTokens, useTheme } from 'tamagui';

type SettingListItemProps = {
  text: string;
  textColor?: ColorTokens | string;
  icon: string | JSX.Element;
  rightText?: string;
  onPress?: () => void;
};

const SettingListItem = forwardRef(
  ({ text, icon, textColor, rightText, onPress = () => {} }: SettingListItemProps, ref) => {
    const theme = useTheme();
    return (
      <Button
        unstyled
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        flexDirection="row"
        bg="$gray1"
        borderRadius="$5"
        onPress={onPress}
        p={10}>
        <XStack alignItems="center" flex={1} gap={10}>
          {icon && icon}
          <SizableText color={textColor ? textColor : '$gray12'} maxWidth="50%" numberOfLines={1}>
            {text}
          </SizableText>
        </XStack>
        {rightText && (
          <XStack alignItems="center" gap={4}>
            <SizableText fontWeight="600" color="$gray9">
              {rightText}
            </SizableText>
            <Ionicons name="chevron-forward" size={14} color={theme.gray9.get()} />
          </XStack>
        )}
      </Button>
    );
  }
);

export default SettingListItem;
