import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './styles';

const TitleHeader=(props) => (
  <View style={styles.contentTitleHeaderTextWrap}>
    <Text style={styles.textTitleHeader}>{props.title}</Text>
  </View>
);

export default TitleHeader;
