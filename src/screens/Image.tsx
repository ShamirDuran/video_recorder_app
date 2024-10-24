import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigator/StackNavigator';
const StaticImage = require('../../assets/images/image_page_bg.jpg');

export const ImageScreen = (
  props: NativeStackScreenProps<RootStackParamsList, 'Image'>,
) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={handleBackButton} />
      <Image style={styles.image} source={StaticImage} resizeMode="contain" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%', // Ancho del 100%
    height: undefined, // Alto del 100%
    aspectRatio: 1, // Relación de aspecto 19:9
  },
});
