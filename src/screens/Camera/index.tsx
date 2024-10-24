import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera} from 'react-native-vision-camera';
import {PermissionRequest, VideoModal} from '../../components';
import {CameraContext} from '../../context';
import {RootStackParamsList} from '../../navigator/StackNavigator';
import {BottomControls} from './BottomControls';
import {UpperControls} from './UpperControls';

Reanimated.addWhitelistedNativeProps({
  exposure: true,
});

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export const CameraScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Camera'>) => {
  const {
    cameraRef,
    device,
    recordedVideo,
    saveRecording,
    clearRecordedVideo,
    hasCameraPermission,
    hasMicroPermission,
    hasStoragePermissions,
    requestCameraPermission,
    requestMicroPermission,
    requestStoragePermissions,
  } = useContext(CameraContext);

  const exposureSlider = useSharedValue(0);
  const exposureValue = useDerivedValue(() => {
    if (device == null) return 0;

    return interpolate(
      exposureSlider.value,
      [-1, 0, 1],
      [device.minExposure, 0, device.maxExposure],
    );
  }, [exposureSlider, device]);

  const exporuseanimatedProps = useAnimatedProps(
    () => ({
      exposure: exposureValue.value,
    }),
    [exposureValue],
  );

  if (!hasCameraPermission) {
    return (
      <PermissionRequest
        permissionType="la cámara"
        requestPermission={requestCameraPermission}
      />
    );
  }

  if (!hasMicroPermission) {
    return (
      <PermissionRequest
        permissionType="el micrófono"
        requestPermission={requestMicroPermission}
      />
    );
  }

  if (!hasStoragePermissions) {
    return (
      <PermissionRequest
        permissionType="el almacenamiento"
        requestPermission={requestStoragePermissions}
      />
    );
  }

  if (!device) {
    return <Text>No se ha encontrado un dispositivo de cámara</Text>;
  }

  const closeCamera = () => navigation.popToTop();

  // Stop recording when the user leaves the screen to avoid memory leaks
  navigation.addListener('beforeRemove', () => {
    cameraRef!.current?.cancelRecording();
  });

  const createSaveVideoConfirmDialog = () => {
    Alert.alert('Guardar video', '¿Deseas guardar el video grabado?', [
      {
        text: 'No',
        style: 'cancel',
        onPress: clearRecordedVideo,
      },
      {
        text: 'Sí',
        onPress: saveRecording,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <UpperControls closeCamera={closeCamera} />
      <ReanimatedCamera
        style={{flex: 1}}
        device={device}
        isActive={true} // Start the camera
        ref={cameraRef}
        video={true} // Record video
        audio={true} // Record audio
        animatedProps={exporuseanimatedProps}
        enableZoomGesture
        outputOrientation="device"
      />
      <BottomControls />

      {recordedVideo && (
        <VideoModal
          isVisible={!!recordedVideo}
          video={recordedVideo}
          handleClose={clearRecordedVideo}
          handleSave={createSaveVideoConfirmDialog}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
});
