import {useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';

export interface VideoElement {
  uri: string;
  path: string;
}

export const useVideos = (albumName: string) => {
  const [videos, setVideos] = useState<VideoElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Videos',
        groupName: albumName, // Nombre del álbum
      });

      const videoUris = await Promise.all(
        result.edges.map(async edge => {
          const filePath = await RNFS.stat(edge.node.image.uri);
          return {
            uri: edge.node.image.uri,
            path: filePath.originalFilepath,
          };
        }),
      );

      setVideos(videoUris);
    } catch (err) {
      setError('Error fetching videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (video: VideoElement) => {
    try {
      await RNFS.unlink(video.path)
        .then(() => {
          console.log('deleted');

          RNFS.scanFile(video.path)
            .then(() => console.log('scanned'))
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });

      setVideos(videos.filter(v => v.uri !== video.uri));
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Ocurrio un error',
        text2: 'Ocurrio un error al eliminar el video',
      });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {videos, loading, error, fetchVideos, deleteVideo};
};
