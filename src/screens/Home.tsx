import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigator/StackNavigator';
import {StyledButton} from '../components';
const HomeBackground = require('../../assets/images/home_page_bg.jpeg');

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Home'>) => {
  return (
    <SafeAreaView>
      <ImageBackground style={styles.backgroundImage} source={HomeBackground}>
        <StyledButton
          text="Imagen"
          onPress={() => navigation.navigate('Image')}
        />
        <StyledButton
          text="Video"
          onPress={() => navigation.navigate('Video')}
        />
        <StyledButton
          text="Galería"
          onPress={() => navigation.navigate('Gallery')}
        />
        <StyledButton
          text="Cámara"
          onPress={() => navigation.navigate('Camera')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
