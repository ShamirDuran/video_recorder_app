import {StyleSheet, Text, View} from 'react-native';
import VideoList from './VideoList';
import {ALBUM_NAME} from '../../context';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme';
import {BackButton} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigator/StackNavigator';

export const GalleryScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Gallery'>) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.toolbar}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.toolbarTitle}>Galeria</Text>
      </View>

      <View style={styles.listContainer}>
        <VideoList albumName={ALBUM_NAME} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
  },
  toolbarTitle: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    marginHorizontal: 8,
    flex: 1,
  },
});
