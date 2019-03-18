/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  SafeAreaView
} from 'react-native';
import AlarmSwiperContent from '../../components/AlarmSwiperContent';
import styles from './styles';

class Alarm extends Component {
  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{
          top: 'always',
          bottom: 'always',
          horizontal: 'never'
        }}>
        <AlarmSwiperContent />
      </SafeAreaView>
    );
  }
}

export default Alarm;
