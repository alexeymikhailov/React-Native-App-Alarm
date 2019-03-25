import React from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './styles';

interface SectionHeaderListItemsProps {
  section: string
}

const SectionHeaderListItems: React.FC<SectionHeaderListItemsProps>=(props) => (
  <View style={styles.sectionHeaderListItemsContentWrap}>
    <Text style={styles.textSectionHeaderListItems}>
      {props.section}
    </Text>
  </View>
);

export default SectionHeaderListItems;
