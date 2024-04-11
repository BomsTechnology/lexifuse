import { forwardRef, LegacyRef } from 'react';
import { Button as TamaguiButton, ButtonProps, TamaguiElement, Spinner } from 'tamagui';

type CustomButtomProps = ButtonProps & {
  loading?: boolean;
};

const Button = forwardRef((props: CustomButtomProps, ref) => {
  const borderBottomWith = props.borderBottomWidth ? props.borderBottomWidth : 3;
  return (
    <TamaguiButton
      size="$5"
      borderRadius="$6"
      borderBottomWidth={borderBottomWith}
      {...props}
      ref={ref as LegacyRef<TamaguiElement>}>
      {props.loading && props.loading === true ? <Spinner color="#fff" /> : props.children}
    </TamaguiButton>
  );
});

export default Button;
