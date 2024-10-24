import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../theme';

interface Props {
  text: string;
  onPress: () => void;
  styles?: any;
}

export const StyledButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={props.styles ?? styles.button}
      onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.primary,
    minWidth: 135,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
