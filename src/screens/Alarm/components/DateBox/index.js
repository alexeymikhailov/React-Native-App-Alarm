import React from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './styles';

const DateBox=(props) => (
  <View style={styles.dateBoxContentWrap}>
    <Text style={styles.textDateBox} numberOfLines={1}>
      {props.date || 'Set the alarm'}
    </Text>
  </View>
);

export default DateBox;