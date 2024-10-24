import {StyleSheet, View} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

export const FlexCenteredContainer = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
