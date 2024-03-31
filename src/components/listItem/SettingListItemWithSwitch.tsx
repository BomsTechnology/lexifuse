import { Switch } from 'react-native';
import { ColorTokens, XStack, SizableText, Button, useTheme } from 'tamagui';

import colors from '~/src/constants/colors';

type SettingListItemWithSwitchProps = {
  text: string;
  textColor?: ColorTokens | string;
  icon: string | JSX.Element | null;
  onValueChange?: () => void;
  value: boolean;
};

const SettingListItemWithSwitch = ({
  text,
  icon,
  textColor,
  onValueChange = () => {},
  value,
}: SettingListItemWithSwitchProps) => {
  const theme = useTheme();
  return (
    <Button
      onPress={onValueChange}
      unstyled
      alignItems="center"
      flexDirection="row"
      flex={1}
      justifyContent="space-between"
      bg="$gray1"
      borderRadius="$5"
      p={10}>
      <XStack onPress={onValueChange} alignItems="center" flex={1} gap={10}>
        {icon && icon}
        <SizableText color={textColor ? textColor : '$gray12'} numberOfLines={1}>
          {text}
        </SizableText>
      </XStack>

      <Switch
        trackColor={{ false: theme.gray8.get(), true: colors.green1 }}
        thumbColor={value ? '#fff' : theme.gray12.get()}
        ios_backgroundColor={theme.gray8.get()}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        value={value}
        onValueChange={onValueChange}
      />
    </Button>
  );
};

export default SettingListItemWithSwitch;
