import {useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';

export const useVideos = (albumName: string) => {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Videos',
        groupName: albumName, // Nombre del álbum
      });

      const videoUris = result.edges.map(edge => edge.node.image.uri);
      setVideos(videoUris);
    } catch (err) {
      setError('Error fetching videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (uri: string) => {
    try {
      await CameraRoll.deletePhotos([uri])
        .then(() =>
          Toast.show({
            position: 'bottom',
            type: 'success',
            text1: 'Video eliminado',
            visibilityTime: 3000,
            autoHide: true,
          }),
        )
        .catch(error => {
          console.log(error);

          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: 'Error al eliminar el video',
            visibilityTime: 3000,
            autoHide: true,
          });
        });

      setVideos(videos.filter(video => video !== uri));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {videos, loading, error, fetchVideos, deleteVideo};
};
