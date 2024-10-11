import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {CameraContext} from '../../context';
import {ActionButton} from '../../components';

const RECORD_BUTTON_SIZE = 78;
const SECONDARY_BUTTON_SIZE = RECORD_BUTTON_SIZE - 16;

export const BottomControls = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    toggleCameraPosition,
  } = useContext(CameraContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* <View style={[styles.leftElement]}>
          {isRecording ? (
            <ActionButton
              onPress={() => {}}
              size={SECONDARY_BUTTON_SIZE}
              innerColor="transparent">
              <Icon name="pause" size={30} color="white" />
            </ActionButton>
          ) : (
            <></>
          )}
        </View> */}

        <View style={styles.centeredElement}>
          <ActionButton
            isActive={isRecording}
            onPress={isRecording ? stopRecording : startRecording}
            transform={true}
            size={RECORD_BUTTON_SIZE}
          />
        </View>

        <View style={styles.rightElement}>
          {isRecording ? (
            <ActionButton
              onPress={cancelRecording}
              innerColor="white"
              size={SECONDARY_BUTTON_SIZE}
            />
          ) : (
            <ActionButton
              onPress={toggleCameraPosition}
              size={SECONDARY_BUTTON_SIZE}
              innerColor="transparent"
              outerColor="white">
              <Icon2 name="refresh" size={30} color="white" />
            </ActionButton>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '15%',
    maxHeight: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftElement: {
    position: 'absolute',
    left: 23,
  },
  centeredElement: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -38}],
  },
  rightElement: {
    position: 'absolute',
    right: 23,
  },
});
