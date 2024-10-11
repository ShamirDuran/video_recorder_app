import {useEffect, useState} from 'react';
import {Permission, PermissionsAndroid, Platform} from 'react-native';

/*
 * This hook checks if the app has storage permissions and requests them if it doesn't.
 */
export const useStoragePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);

  const checkPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const requestPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  useEffect(() => {
    checkPermissionPromise().then(setHasPermissions);
  }, []);

  return {
    hasPermissions,
    requestPermissions: () => {
      return requestPermissionPromise().then((hasPermission: boolean) => {
        setHasPermissions(hasPermission);
        return hasPermission;
      });
    },
  };
};
