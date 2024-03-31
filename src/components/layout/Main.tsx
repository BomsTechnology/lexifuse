import { forwardRef, LegacyRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiElement, YStackProps } from 'tamagui';

import { Main as MainWithConfig } from '~/tamagui.config';

const Main = forwardRef((props: YStackProps, ref) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <MainWithConfig pb={bottom} {...props} ref={ref as LegacyRef<TamaguiElement>}>
      {props.children}
    </MainWithConfig>
  );
});

export default Main;
