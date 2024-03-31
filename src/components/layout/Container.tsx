import { forwardRef, LegacyRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiElement, YStackProps } from 'tamagui';

import { Container as ContainerWithConfig } from '~/tamagui.config';

const Container = forwardRef((props: YStackProps, ref) => {
  const { top } = useSafeAreaInsets();

  return (
    <ContainerWithConfig {...props} pt={top} ref={ref as LegacyRef<TamaguiElement>}>
      {props.children}
    </ContainerWithConfig>
  );
});

export default Container;
