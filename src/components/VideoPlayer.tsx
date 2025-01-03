import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import Video, {VideoRef} from 'react-native-video';

interface VideoPlayerProps {
  video: any;
  fullscreen?: boolean;
}

/**
 * Shows a video player with the given video file
 * @param video Video file to play
 * @returns void
 */
export const VideoPlayer = ({video, fullscreen = false}: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);

  return (
    <Video
      source={video}
      ref={videoRef}
      controls
      resizeMode="cover"
      paused={true}
      style={styles.video}
      onError={_ =>
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Se ha producido un error al cargar el video',
        })
      }
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
