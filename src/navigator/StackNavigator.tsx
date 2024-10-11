import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {CameraScreen, HomeScreen, ImageScreen, VideoScreen} from '../screens';
import {GalleryScreen} from '../screens/Gallery';
import {CameraProvider} from '../context';

export type RootStackParamsList = {
  Home: undefined;
  Image: undefined;
  Video: undefined;
  Gallery: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const CameraWithProvider = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamsList, 'Camera'>) => (
  <CameraProvider>
    <CameraScreen navigation={navigation} route={route} />
  </CameraProvider>
);

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
        <Stack.Screen name="Camera" component={CameraWithProvider} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
