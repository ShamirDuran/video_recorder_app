import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useStoragePermissions, useVideos} from '../../hooks';
import {colors} from '../../theme';
import Video from 'react-native-video';
import {BackButton, IconButton, PermissionRequest} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  albumName: string;
}

const VideoList = ({albumName}: Props) => {
  const {videos, loading, error, fetchVideos, deleteVideo} =
    useVideos(albumName);
  const {hasPermissions, requestPermissions} = useStoragePermissions();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoPress = (uri: string) => {
    setSelectedVideo(uri);
    setIsFullScreen(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!hasPermissions) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PermissionRequest
          permissionType="galeria"
          requestPermission={() =>
            requestPermissions().then(() => fetchVideos())
          }
        />
      </View>
    );
  }
  return (
    <View style={styles.gridContainer}>
      {videos.length === 0 ? (
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No hay videos</Text>
        </View>
      ) : (
        <FlatList
          data={[...videos]}
          keyExtractor={(_, index) => index.toString()}
          numColumns={4}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => handleVideoPress(item)}>
              <View style={styles.listItem}>
                <Image
                  source={{uri: item}}
                  style={styles.videoItem}
                  resizeMode="cover"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}

      {isFullScreen && selectedVideo && (
        <Modal visible={isFullScreen} animationType="slide" transparent={true}>
          <View style={styles.fullScreenContainer}>
            <View style={styles.fullScreenVideoContainer}>
              <Video
                source={{uri: selectedVideo}}
                style={styles.fullScreenVideo}
                controls={true} // Agregar controles para reproducir/pausar
                resizeMode="contain"
                fullscreen={false}
              />
            </View>

            <BackButton onPress={() => setIsFullScreen(false)} />
            <IconButton
              style={styles.deleteButton}
              onPress={() => {
                if (selectedVideo) {
                  setIsFullScreen(false);
                  deleteVideo(selectedVideo);
                }
              }}>
              <Icon name="delete" size={26} color={colors.red} />
            </IconButton>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 4,
    width: '100%',
    marginHorizontal: 'auto',
  },
  listItem: {
    flex: 1,
    maxWidth: '25%', // 100% / # of columns
    alignItems: 'center',
    padding: 4,
  },
  videoItem: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
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
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});

export default VideoList;
