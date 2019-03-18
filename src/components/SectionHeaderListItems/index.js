import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './styles';

const SectionHeaderListItems=(props) => (
  <View style={styles.sectionHeaderListItemsContentWrap}>
    <Text style={styles.textSectionHeaderListItems}>
      {props.section}
    </Text>
  </View>
);

export default SectionHeaderListItems;
