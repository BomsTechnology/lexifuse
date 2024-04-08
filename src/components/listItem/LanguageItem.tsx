import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SizableText } from 'tamagui';

import colors from '~/src/constants/colors';
import i18n from '~/src/i18n';
import { Database } from '~/src/types/database.types';
type LanguageItemProps = {
  language: Database['public']['Tables']['languages']['Row'];
  active: boolean;
  onPress?: () => void;
  width?: number;
  height?: number;
};
const LanguageItem = ({ language, active, width, height, onPress }: LanguageItemProps) => {
  return (
    <TouchableOpacity style={styles.imageContainerStyle} onPress={onPress}>
      <Image
        source={{ uri: language.image }}
        style={[
          styles.imageStyle,
          {
            borderColor: active ? colors.blue1 : 'transparent',
            width: width ? width : 65,
            height: height ? height : 45,
          },
        ]}
        resizeMode="cover"
      />
      <SizableText fontWeight="600" color={active ? colors.blue1 : '$gray10'}>
        {i18n.t(language.name.toLowerCase())}
      </SizableText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainerStyle: {
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 8,
    borderWidth: 4,
  },
});

export default LanguageItem;
