import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigator/StackNavigator';
const StaticImage = require('../../assets/images/find_your_table.jpeg');

export const TablesScreen = (
  props: NativeStackScreenProps<RootStackParamsList, 'Tables'>,
) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={handleBackButton} />
      <Image style={styles.image} source={StaticImage} resizeMode="cover" />
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
    width: '100%',
    height: '100%',
  },
});
