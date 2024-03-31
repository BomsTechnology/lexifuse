import { forwardRef, LegacyRef } from 'react';
import { Button as TamaguiButton, ButtonProps, TamaguiElement } from 'tamagui';

type CustomButtomProps = ButtonProps & {
  loadiing?: boolean;
};

const Button = forwardRef((props : CustomButtomProps, ref) => {
  const borderBottomWith = props.borderBottomWidth ? props.borderBottomWidth : 3;
  return (
    <TamaguiButton
      fontFamily="$heading"
      size="$5"
      borderRadius="$6"
      borderBottomWidth={borderBottomWith}
      {...props}
      ref={ref as LegacyRef<TamaguiElement>}>
      {props.children}
    </TamaguiButton>
  );
});

export default Button;
