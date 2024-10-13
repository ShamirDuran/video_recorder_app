import {createContext, useEffect, useRef, useState, useCallback} from 'react';
import {
  Camera,
  CameraDevice,
  CameraPosition,
  getCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {useStoragePermissions, useTimer} from '../hooks';
import {Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {VideoElement} from '../hooks/useVideos';

export const ALBUM_NAME = 'VideoRecorderApp';
const CAMERA_TIMEOUT = 30;

interface CameraProviderProps {
  children: React.ReactNode;
}

interface CameraContextType {
  cameraRef?: React.RefObject<Camera>;
  isRecording: boolean;
  isFlashEnabled?: boolean;
  videoLength: number;
  recordedVideo?: VideoElement;
  device?: CameraDevice;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;
  saveRecording: () => void;
  clearRecordedVideo: () => void;
  toggleCameraPosition: () => void;
  hasCameraPermission: boolean;
  hasMicroPermission: boolean;
  hasStoragePermissions: boolean;
  requestCameraPermission: () => void;
  requestMicroPermission: () => void;
  requestStoragePermissions: () => void;
  toggleFlash: () => void;
}

export const CameraContext = createContext<CameraContextType>({
  isRecording: false,
  videoLength: 0,
  startRecording: () => {},
  stopRecording: () => {},
  pauseRecording: () => {},
  resumeRecording: () => {},
  cancelRecording: () => {},
  saveRecording: () => {},
  clearRecordedVideo: () => {},
  hasCameraPermission: false,
  hasMicroPermission: false,
  hasStoragePermissions: false,
  requestCameraPermission: () => {},
  requestMicroPermission: () => {},
  requestStoragePermissions: () => {},
  toggleCameraPosition: () => {},
  toggleFlash: () => {},
});

export const CameraProvider = ({children}: CameraProviderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [videoLength, setVideoLength] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState<
    VideoElement | undefined
  >();
  const cameraRef = useRef<Camera>(null);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [device, setDevice] = useState<CameraDevice | undefined>(
    Camera.getAvailableCameraDevices()[0],
  );

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicroPermission,
    requestPermission: requestMicroPermission,
  } = useMicrophonePermission();

  const {
    hasPermissions: hasStoragePermissions,
    requestPermissions: requestStoragePermissions,
  } = useStoragePermissions();

  const clearDataOnStopRecording = useCallback(() => {
    setVideoLength(0);
    setIsRecording(false);
    setRecordedVideo(undefined);
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        cameraRef.current.startRecording({
          flash: isFlashEnabled ? 'on' : 'off',
          videoBitRate: 'high',
          onRecordingFinished: async video => {
            console.log('Video grabado:', video);

            setRecordedVideo({
              uri: video.path,
              path: video.path,
            });
          },
          onRecordingError: error => {
            console.error('Error grabando video:', error);
            clearDataOnStopRecording();
          },
        });

        setIsRecording(true);
        setRecordedVideo(undefined);
        setVideoLength(CAMERA_TIMEOUT); // Reset video length
      } catch (error) {
        console.error('Error al iniciar la grabación:', error);
      }
    }
  };

  const saveRecording = async () => {
    try {
      if (!recordedVideo) return;

      if (Platform.OS === 'android' && !hasStoragePermissions) {
        await requestStoragePermissions();
      }
      await CameraRoll.saveAsset(recordedVideo.uri, {
        type: 'video',
        album: ALBUM_NAME,
      });

      setRecordedVideo(undefined);
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  const clearRecordedVideo = () => {
    setRecordedVideo(undefined);
  };

  const stopRecording = async (force = false) => {
    if (isRecording || force) {
      await cameraRef.current?.stopRecording();
      clearDataOnStopRecording();
    }
  };

  const pauseRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.pauseRecording();
    }
  };

  const resumeRecording = async () => {
    if (cameraRef.current && !isRecording) {
      await cameraRef.current.resumeRecording();
      setIsRecording(true);
    }
  };

  const cancelRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.cancelRecording();
      clearDataOnStopRecording();
    }
  };

  const toggleFlash = () => {
    setIsFlashEnabled(prev => !prev);
  };

  const toggleCameraPosition = () => {
    const newPosition = cameraPosition === 'back' ? 'front' : 'back';
    const newDevice = getCameraDevice(
      Camera.getAvailableCameraDevices(),
      newPosition,
    );

    setCameraPosition(newPosition);
    setDevice(newDevice);
  };

  useEffect(() => {
    if (videoLength === 0) {
      stopRecording(true);
    }
  }, [videoLength]);

  useTimer(isRecording, () => {
    setVideoLength(prev => prev - 1);
  });

  // Stop recording when the component unmounts
  useEffect(() => {
    return () => {
      clearDataOnStopRecording();
      stopRecording(true);
    };
  }, []);

  return (
    <CameraContext.Provider
      value={{
        cameraRef,
        device,
        videoLength,
        recordedVideo,
        isRecording,
        isFlashEnabled,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        cancelRecording,
        saveRecording,
        clearRecordedVideo,
        hasCameraPermission,
        hasMicroPermission,
        hasStoragePermissions,
        requestCameraPermission,
        requestMicroPermission,
        requestStoragePermissions,
        toggleCameraPosition,
        toggleFlash,
      }}>
      {children}
    </CameraContext.Provider>
  );
};
