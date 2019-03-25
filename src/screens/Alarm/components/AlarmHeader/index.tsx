import React, { Component } from 'react';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import Icon from 'react-native-vector-icons/Feather';
import { scheduleNewAlarm } from '../../../../actions';
import {
  ERROR_SCHEDULE_CURRENT_TIME_ALARM,
  ERROR_SCHEDULED_TIME_ALARM
} from '../../../../constants';
import {
  ModalData,
  AlarmItem
} from '../../../../models';
import {
  getUniqueId,
  getCurrentDateTime,
  setSecondDateTimeAlarm
} from '../../../../resources/strings';
import { onHandleAlarmAlertDialogBox } from '../../../../utils/Alerts';
import NotificationService from '../../../../utils/NotificationService';
import {
  checkScheduleCurrentTimeAlarm,
  existScheduledDateTimeAlarm
} from '../../../../utils/Validation';
import DateBox from '../DateBox';
import TouchButton from '../../../../common/components/TouchButton';
import TitleHeader from '../../../../common/components/TitleHeader';
import StyleColors from '../../../../resources/style/colors';
import styles from './styles';

interface CardItemAlarmProps {
  notificationService: NotificationService,
  onHandleOpenAlarmAddModal: (modalData: ModalData) => void,
  scheduledAlarmList: AlarmItem[],
  dispatch: Dispatch,
  date?: string
}

class AlarmHeader extends Component<CardItemAlarmProps, {}> {
  onHandleOpenAlarmAddModal=() => {
    this.props.onHandleOpenAlarmAddModal({
      title: 'Adding',
      minimumDatePicker: getCurrentDateTime(),
      modeDatePicker: 'datetime',
      onHandleCloseSuccessAlarmModal: this.onHandleCloseSuccessAlarmAddModal
    });
  };

  onHandleCloseSuccessAlarmAddModal=(scheduledDateTime: object, alarmTextValue: string) => {
    if (checkScheduleCurrentTimeAlarm(scheduledDateTime)) {
      onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULE_CURRENT_TIME_ALARM);
      return false;
    } else if (existScheduledDateTimeAlarm(this.props.scheduledAlarmList, scheduledDateTime)) {
      onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULED_TIME_ALARM);
      return false;
    } else {
      const addNewAlarm={
        alarmId: getUniqueId(),
        datetime: setSecondDateTimeAlarm(scheduledDateTime),
        text: alarmTextValue
      };

      this.props.dispatch(scheduleNewAlarm(addNewAlarm));
      this.props.notificationService.onHandleLocalNotificationSchedule({
        id: String(addNewAlarm.alarmId),
        message: addNewAlarm.text,
        date: addNewAlarm.datetime
      });

      return true;
    }
  };

  render() {
    const { date }=this.props;

    return (
      <View style={styles.alarmHeaderContentWrap}>
        <View style={styles.headerControlAreaWrap}>
          <DateBox
            date={date} />
          <TouchButton
            onPress={this.onHandleOpenAlarmAddModal}>
            <Icon
              name="plus"
              size={30}
              color={StyleColors.BLACK} />
          </TouchButton>
        </View>
        <TitleHeader
          title="My Alarms" />
      </View>
    );
  }
}

export default AlarmHeader;
