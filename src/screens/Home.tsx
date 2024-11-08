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
          text="MINUTO A MINUTO"
          onPress={() => navigation.navigate('Image')}
        />
        <StyledButton
          text="MOMENTO DE LOS NOVIOS"
          onPress={() => navigation.navigate('Video')}
        />
        <StyledButton
          text="DEJA TU MENSAJE"
          onPress={() => navigation.navigate('Camera')}
        />
        <StyledButton
          text="BUSCA TU MESA"
          onPress={() => navigation.navigate('Tables')}
        />
        <StyledButton
          text="GALERIA"
          onPress={() => navigation.navigate('Gallery')}
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
