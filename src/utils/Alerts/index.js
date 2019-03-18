import React, { Component } from 'react';
import {
  Alert
} from 'react-native';

export const onHandleAlarmAlertDialogBox=(
  title='',
  message='',
  buttons=[
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
