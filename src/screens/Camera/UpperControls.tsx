import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CameraContext} from '../../context';
import {useContext} from 'react';
import {formatTime} from '../../utils';
import {colors} from '../../theme';

interface Props {
  closeCamera: () => void;
}

export const UpperControls = ({closeCamera}: Props) => {
  const {isRecording, isFlashEnabled, toggleFlash, videoLength} =
    useContext(CameraContext);

  return (
    <View style={styles.container}>
      {!isRecording && (
        <View style={styles.leftElement}>
          <Icon
            name="arrow-back"
            size={23}
            color="white"
            onPress={closeCamera}
          />
        </View>
      )}

      <View
        style={[
          styles.centeredElement,
          isRecording && {
            backgroundColor: colors.red,
            paddingHorizontal: 10,
            borderRadius: 5,
          },
        ]}>
        <Text
          style={[
            styles.timeCounter,
            isRecording && {
              fontSize: 23,
            },
          ]}>
          {formatTime(videoLength)}
        </Text>
      </View>

      {!isRecording && (
        <View style={styles.rightElement}>
          {isFlashEnabled ? (
            <Icon
              name="flash-on"
              size={23}
              color="white"
              onPress={toggleFlash}
            />
          ) : (
            <Icon
              name="flash-off"
              size={23}
              color="white"
              onPress={toggleFlash}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 45,
  },
  timeCounter: {
    color: 'white',
    fontWeight: '400',
    fontSize: 22,
  },
  leftElement: {
    position: 'absolute',
    left: 23,
  },
  centeredElement: {
    position: 'absolute',
  },
  rightElement: {
    position: 'absolute',
    right: 23,
  },
});
