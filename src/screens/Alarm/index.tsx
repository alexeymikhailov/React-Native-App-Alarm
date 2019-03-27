/**
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import SafeAreaView from '../../common/components/SafeAreaView';
import AlarmSwiperContent from './components/AlarmSwiperContent';

const Alarm: React.FC<{}>=() => (
  <SafeAreaView>
    <AlarmSwiperContent />
  </SafeAreaView>
);

export default Alarm;
