import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

interface VideoPlayerProps {
  video: any;
}

/**
 * Shows a video player with the given video file
 * @param video Video file to play
 * @returns void
 */
export const VideoPlayer = ({video}: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);
  return (
    <Video
      source={video}
      ref={videoRef}
      controls
      resizeMode="cover"
      paused={true}
      style={styles.video}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
