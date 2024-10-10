import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigator/StackNavigator';
import {StyledButton} from '../components';
import {colors} from '../theme';

export const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Home'>) => {
  return (
    <SafeAreaView>
      <View style={styles.bodyWrapper}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.secondary,
  },
});
