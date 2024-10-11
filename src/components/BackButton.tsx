import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme';
import {IconButton} from './IconButton';

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
    <IconButton style={styles.wrapper} onPress={onPress}>
      <Icon name="arrow-back" size={26} color="white" />
    </IconButton>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
