import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme';

interface Props {
  onPress: () => void;
}

/**
 * The usual back button that is used to navigate back to the previous screen
 * @param onPress Action to be executed when the button is pressed
 * @returns void
 */
export const BackButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.wrapper}>
      <Icon name="arrow-back" size={26} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
});
