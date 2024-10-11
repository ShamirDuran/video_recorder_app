import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera} from 'react-native-vision-camera';
import {CameraContext} from '../../context';
import {RootStackParamsList} from '../../navigator/StackNavigator';
import {BottomControls} from './BottomControls';
import {UpperControls} from './UpperControls';
import {PermissionRequest} from '../../components';

export const CameraScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Camera'>) => {
  const {
    cameraRef,
    device,
    hasCameraPermission,
    hasMicroPermission,
    hasStoragePermissions,
    requestCameraPermission,
    requestMicroPermission,
    requestStoragePermissions,
  } = useContext(CameraContext);

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

  const closeCamera = () => {
    /// clear all stack then go home
    navigation.popToTop();
  };

  // Stop recording when the user leaves the screen to avoid memory leaks
  navigation.addListener('beforeRemove', () => {
    cameraRef!.current?.cancelRecording();
  });

  return (
    <SafeAreaView style={styles.container}>
      <UpperControls closeCamera={closeCamera} />
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true} // Start the camera
        ref={cameraRef}
        video={true} // Record video
        audio={true} // Record audio
      />
      <BottomControls />
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
