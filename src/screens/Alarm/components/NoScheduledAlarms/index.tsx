import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import StyleColors from '../../../../resources/style/colors';
import {
  NoScheduledAlarmsContentWrap,
  NoScheduledAlarmsIconWrap,
  TextNoScheduledAlarms
} from './styles';

const NoScheduledAlarms: React.FC<{}>=() => (
  <NoScheduledAlarmsContentWrap>
    <NoScheduledAlarmsIconWrap>
      <Icon
        name={"md-alarm"}
        size={84}
        color={StyleColors.LIGHT_GRAY} />
    </NoScheduledAlarmsIconWrap>
    <TextNoScheduledAlarms>There are no scheduled alarms</TextNoScheduledAlarms>
  </NoScheduledAlarmsContentWrap>
);

export default NoScheduledAlarms;
