import React from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from './styles';

interface TitleHeaderProps {
  title: string
}

const TitleHeader: React.FC<TitleHeaderProps>=(props) => (
  <View style={styles.contentTitleHeaderTextWrap}>
    <Text style={styles.textTitleHeader}>{props.title}</Text>
  </View>
);

export default TitleHeader;
