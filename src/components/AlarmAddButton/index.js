import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import StyleColors from '../../style/colors';

const AlarmAddButton=(props) => (
  <TouchableOpacity
    onPress={props.onPressOpenAlarmModal}
    activeOpacity={.5}>
    <Icon
      name="plus"
      size={30}
      color={StyleColors.BLACK} />
  </TouchableOpacity>
);

export default AlarmAddButton;
