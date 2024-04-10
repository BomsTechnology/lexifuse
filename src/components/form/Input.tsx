import { Control, Controller } from 'react-hook-form';
import { XStack, Input as TamaguiInput, InputProps, SizableText } from 'tamagui';

import i18n from '~/src/i18n';

type CustomInputProps = InputProps & {
  icon?: JSX.Element;
  rules?: object;
  name?: string;
  control?: Control;
};

const Input = (props: CustomInputProps) => {
  return (
    <Controller
      name={props.name!}
      control={props.control}
      rules={props.rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <XStack
            alignItems="center"
            backgroundColor={props.backgroundColor}
            borderWidth={1}
            borderColor={error ? '$red10' : '$gray6'}
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
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          </XStack>
          {error && <SizableText color="$red10">{error.message || i18n.t('error')}</SizableText>}
        </>
      )}
    />
  );
};

export default Input;
