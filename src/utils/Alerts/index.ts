import { Alert } from 'react-native';

interface AlarmAlertDialogBoxButtons {
  text: string,
  onPress: () => boolean
}

export const onHandleAlarmAlertDialogBox=(
  title: string='',
  message: string='',
  buttons: AlarmAlertDialogBoxButtons[]=[
    {
      text: 'OK',
      onPress: () => true
    }
  ]
) => {
  Alert.alert(
    title,
    message,
    [...buttons],
    {
      cancelable: false
    }
  );
};
