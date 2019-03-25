/**
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { SafeAreaView } from 'react-navigation';
import AlarmSwiperContent from './components/AlarmSwiperContent';
import styles from './styles';

const Alarm: React.FC<{}>=() => (
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

export default Alarm;
