import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton, VideoPlayer} from '../components';
import {RootStackParamsList} from '../navigator/StackNavigator';

export const VideoScreen = (
  props: NativeStackScreenProps<RootStackParamsList, 'Video'>,
) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => props.navigation.goBack()} />
      <VideoPlayer video={require('../../assets/videos/test-video.mp4')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
