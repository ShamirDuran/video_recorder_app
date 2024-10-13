import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, CameraProps} from 'react-native-vision-camera';
import {PermissionRequest, VideoModal} from '../../components';
import {CameraContext} from '../../context';
import {RootStackParamsList} from '../../navigator/StackNavigator';
import {BottomControls} from './BottomControls';
import {UpperControls} from './UpperControls';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
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

  const zoom = useSharedValue(device!.neutralZoom);

  const zoomOffset = useSharedValue(0);
  const zoomGesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
      const z = zoomOffset.value * event.scale;
      zoom.value = interpolate(
        z,
        [1, 10],
        [device!.minZoom, device!.maxZoom],
        Extrapolation.CLAMP,
      );
    });

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({zoom: zoom.value}),
    [zoom],
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
      <GestureDetector gesture={zoomGesture}>
        <ReanimatedCamera
          style={{flex: 1}}
          device={device}
          isActive={true} // Start the camera
          ref={cameraRef}
          video={true} // Record video
          audio={true} // Record audio
          animatedProps={animatedProps}
        />
      </GestureDetector>
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
