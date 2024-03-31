import { XStack, Input as TamaguiInput, InputProps } from 'tamagui';

type CustomInputProps = InputProps & {
  icon?: JSX.Element;
};

const Input = (props: CustomInputProps) => {
  return (
    <XStack
      alignItems="center"
      backgroundColor={props.backgroundColor}
      py="$2"
      px="$3"
      borderRadius="$2">
      {props.icon}
      <TamaguiInput
        {...props}
        borderRadius={0}
        flex={1}
        borderWidth={0}
        fontWeight="500"
        fontSize={16}
      />
    </XStack>
  );
};

export default Input;
