import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraScreen, HomeScreen, ImageScreen, VideoScreen} from '../screens';
import {GalleryScreen} from '../screens/Gallery';

export type RootStackParamsList = {
  Home: undefined;
  Image: undefined;
  Video: undefined;
  Gallery: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
