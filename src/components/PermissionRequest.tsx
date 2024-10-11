import {View, Text, Button, StyleSheet} from 'react-native';
import {colors} from '../theme';

interface Props {
  permissionType: string;
  requestPermission: () => void;
}

export const PermissionRequest = (props: Props) => {
  return (
    <View style={styles.flexContainer}>
      <Text>No se ha otorgado permiso para {props.permissionType}</Text>
      <Button
        color={colors.primary}
        title={`Solicitar permiso`}
        onPress={props.requestPermission}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
