import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/navigator/StackNavigator';
import {useEffect} from 'react';
import {Appearance} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <StackNavigator />
      </GestureHandlerRootView>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
