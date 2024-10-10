import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
