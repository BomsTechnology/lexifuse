import { ActivityIndicator, View } from 'react-native';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#077AD2',
      }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default Splash;
