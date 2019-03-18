import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StyleColors from '../../style/colors';
import styles from './styles';

const NoScheduledAlarms=() => (
  <View style={styles.noScheduledAlarmsContentWrap}>
    <View style={styles.noScheduledAlarmsIconWrap}>
      <Icon
        name={"md-alarm"}
        size={84}
        color={StyleColors.LIGHT_GRAY} />
    </View>
    <Text style={styles.textNoScheduledAlarms}>There are no scheduled alarms</Text>
  </View>
);

export default NoScheduledAlarms;
