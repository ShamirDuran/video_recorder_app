import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../components';
import {RootStackParamsList} from '../navigator/StackNavigator';
const StaticImage = require('../../assets/images/test-image.jpg');

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
    width: '95%',
    height: undefined,
    aspectRatio: 1,
  },
});
