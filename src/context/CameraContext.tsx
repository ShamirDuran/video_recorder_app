import {createContext, useEffect, useRef, useState} from 'react';
import {
  Camera,
  CameraDevice,
  CameraPosition,
  getCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

interface CameraProviderProps {
  children: React.ReactNode;
}

interface CameraContextType {
  cameraRef?: React.RefObject<Camera>;
  isRecording: boolean;
  isFlashEnabled?: boolean;
  videoLength: number;
  device?: CameraDevice;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;
  toggleCameraPosition: () => void;
  hasCameraPermission: boolean;
  requestCameraPermission: () => void;
  hasMicroPermission: boolean;
  requestMicroPermission: () => void;
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
  hasCameraPermission: false,
  requestCameraPermission: () => {},
  hasMicroPermission: false,
  requestMicroPermission: () => {},
  toggleCameraPosition: () => {},
  toggleFlash: () => {},
});

export const CameraProvider = ({children}: CameraProviderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [videoLength, setVideoLength] = useState(0); // Time in seconds
  const cameraRef = useRef<Camera>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // To store the timer reference

  const devices = Camera.getAvailableCameraDevices();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const [device, setDevice] = useState<CameraDevice | undefined>(devices[0]);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicroPermission,
    requestPermission: requestMicroPermission,
  } = useMicrophonePermission();

  // Start recording and start the timer
  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        cameraRef.current.startRecording({
          flash: isFlashEnabled ? 'on' : 'off',
          videoBitRate: 'high',
          onRecordingFinished: video => {
            console.log('Video recorded:', video);
            setVideoLength(0); // Reset video length when recording is finished
          },
          onRecordingError: error => {
            console.error('Error recording video:', error);
            setVideoLength(0); // Reset video length if there's an error
          },
        });

        setIsRecording(true);
        setVideoLength(0); // Reset video length
        startTimer(); // Start the timer when recording starts
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  // Stop recording and stop the timer
  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.stopRecording();
      setIsRecording(false);
      stopTimer(); // Stop the timer when recording stops
      setVideoLength(0); // Reset video length when recording is stopped
    }
  };

  // Pause recording and pause the timer
  const pauseRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.pauseRecording();
      stopTimer(); // Stop the timer when recording is paused
    }
  };

  // Resume recording and resume the timer
  const resumeRecording = async () => {
    if (cameraRef.current && !isRecording) {
      await cameraRef.current.resumeRecording();
      setIsRecording(true); // Set recording state to true
      startTimer(); // Restart the timer when recording resumes
    }
  };

  // Cancel recording and stop the timer
  const cancelRecording = async () => {
    if (cameraRef.current && isRecording) {
      await cameraRef.current.cancelRecording();
      setIsRecording(false);
      stopTimer(); // Stop the timer when recording is canceled
      setVideoLength(0); // Reset video length if recording is canceled
    }
  };

  // Function to start the timer
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setVideoLength(prev => prev + 1); // Increment video length by 1 second
      }, 1000); // Increment every 1 second
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Toggle flash on/off
  const toggleFlash = () => {
    setIsFlashEnabled(prev => !prev);
  };

  // Toggle between front and back cameras
  const toggleCameraPosition = () => {
    const newPosition = cameraPosition === 'back' ? 'front' : 'back';
    const newDevice = getCameraDevice(devices, newPosition);

    setCameraPosition(newPosition);
    setDevice(newDevice);
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <CameraContext.Provider
      value={{
        cameraRef,
        isRecording,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        cancelRecording,
        hasCameraPermission,
        requestCameraPermission,
        hasMicroPermission,
        requestMicroPermission,
        device,
        toggleCameraPosition,
        isFlashEnabled,
        toggleFlash,
        videoLength, // Expose the video length
      }}>
      {children}
    </CameraContext.Provider>
  );
};
