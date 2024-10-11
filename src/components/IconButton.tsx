import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  color?: string;
  p?: number;
  style?: any;
}

export const IconButton = ({
  children,
  onPress,
  color = colors.primary,
  p: padding = 8,
  style,
}: Props) => {
  return (
    <View
      style={[
        styles.wrapper,
        color && {backgroundColor: color},
        !!padding && {padding: padding},
        style,
      ]}>
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
  },
});
