import {Modal, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {BackButton} from './BackButton';
import {VideoElement} from '../hooks/useVideos';
import {IconButton} from './IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme';

interface Props {
  isVisible: boolean;
  saveButton?: boolean;
  video: VideoElement;
  handleClose: () => void;
  handleSave?: () => void;
}

export const VideoModal = (props: Props) => {
  return (
    <Modal visible={props.isVisible} animationType="slide" transparent={true}>
      <View style={styles.fullScreenContainer}>
        <View style={styles.fullScreenVideoContainer}>
          <Video
            source={{uri: props.video.uri}}
            style={styles.fullScreenVideo}
            controls={true} // Agregar controles para reproducir/pausar
            resizeMode="contain"
            fullscreen={false}
          />
        </View>

        <BackButton onPress={props.handleClose} />

        <IconButton
          style={styles.actionButton}
          onPress={props.handleSave ? props.handleSave : () => {}}>
          <Icon name="save" size={26} color={colors.primary} />
        </IconButton>
        {/* <IconButton
        style={styles.actionButton}
        onPress={() => {
          if (selectedVideo) {
            setIsFullScreen(false);
            deleteVideo(selectedVideo);
          }
        }}>
        <Icon name="delete" size={26} color={colors.red} />
      </IconButton> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreenVideoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  fullScreenVideo: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  actionButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});
