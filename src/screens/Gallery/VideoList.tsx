import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  FlexCenteredContainer,
  PermissionRequest,
  VideoModal,
} from '../../components';
import {useStoragePermissions, useVideos} from '../../hooks';
import {colors} from '../../theme';
import {VideoElement} from '../../hooks/useVideos';

interface Props {
  albumName: string;
}

const VideoList = ({albumName}: Props) => {
  const {videos, loading, error, fetchVideos} = useVideos(albumName);
  const {hasPermissions, requestPermissions} = useStoragePermissions();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoElement | null>(null);

  const handleVideoPress = (video: VideoElement) => {
    setSelectedVideo(video);
    setIsFullScreen(true);
  };

  if (loading) {
    return (
      <FlexCenteredContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </FlexCenteredContainer>
    );
  }

  if (error) {
    return (
      <FlexCenteredContainer>
        <Text>{error}</Text>
      </FlexCenteredContainer>
    );
  }

  if (!hasPermissions) {
    return (
      <FlexCenteredContainer>
        <PermissionRequest
          permissionType="galeria"
          requestPermission={() =>
            requestPermissions().then(() => fetchVideos())
          }
        />
      </FlexCenteredContainer>
    );
  }

  return (
    <View style={styles.gridContainer}>
      {videos.length === 0 ? (
        <FlexCenteredContainer>
          <Text>No hay videos</Text>
        </FlexCenteredContainer>
      ) : (
        <FlatList
          data={[...videos]}
          keyExtractor={(_, index) => index.toString()}
          numColumns={4}
          renderItem={({item: imagePath}) => (
            <TouchableWithoutFeedback
              onPress={() => handleVideoPress(imagePath)}>
              <View style={styles.listItem}>
                <Image
                  source={{uri: imagePath.uri}}
                  style={styles.videoItem}
                  resizeMode="cover"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}

      {isFullScreen && selectedVideo && (
        <VideoModal
          isVisible={isFullScreen}
          video={selectedVideo}
          handleClose={() => setIsFullScreen(false)}
        />
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
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});

export default VideoList;
