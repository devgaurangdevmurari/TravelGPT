import {useState} from 'react';
import {Platform, Alert} from 'react-native';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

const usePermissions = () => {
  const [denialCount, setDenialCount] = useState(0);

  const checkPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
        const result = await check(permission);

        if (result === RESULTS.GRANTED) {
          return true;
        }

        if (result === RESULTS.DENIED) {
          setDenialCount(prev => prev + 1);
          if (denialCount >= 2) {
            Alert.alert(
              'Permission Needed',
              'Microphone access is required. Enable it in app settings.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: () => openSettings()},
              ],
            );
          } else {
            const res = await request(permission);
            return res === RESULTS.GRANTED;
          }
        }

        if (result === RESULTS.BLOCKED) {
          Alert.alert(
            'Permission Blocked',
            'Microphone access is blocked. Enable it in app settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => openSettings()},
            ],
          );
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    }
    return false;
  };

  return {checkPermission};
};

export default usePermissions;
