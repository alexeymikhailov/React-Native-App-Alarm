import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  scheduleNewAlarm
} from '../../../../actions';
import {
  ERROR_SCHEDULE_CURRENT_TIME_ALARM,
  ERROR_SCHEDULED_TIME_ALARM
} from '../../../../constants';
import {
  getUniqueId,
  getCurrentDateTime,
  setSecondDateTimeAlarm
} from '../../../../resources/strings';
import {
  onHandleAlarmAlertDialogBox
} from '../../../../utils/Alerts';
import {
  checkScheduleCurrentTimeAlarm,
  existScheduledDateTimeAlarm
} from '../../../../utils/Validation';
import DateBox from '../DateBox';
import AlarmAddButton from '../AlarmAddButton';
import TitleHeader from '../TitleHeader';
import styles from './styles';

class AlarmHeader extends Component {
  constructor(props) {
    super(props);

    this.onHandleOpenAlarmAddModal=() => {
      this.props.onHandleOpenAlarmAddModal({
        title: 'Adding',
        minimumDatePicker: getCurrentDateTime(),
        modeDatePicker: 'datetime',
        onHandleCloseSuccessAlarmModal: this.onHandleCloseSuccessAlarmAddModal
      });
    };

    this.onHandleCloseSuccessAlarmAddModal=(scheduledDateTime, alarmTextValue) => {
      if (checkScheduleCurrentTimeAlarm(scheduledDateTime)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULE_CURRENT_TIME_ALARM);
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
          id: addNewAlarm.alarmId,
          message: addNewAlarm.text,
          date: addNewAlarm.datetime
        });

        return true;
      }
    };
  }

  render() {
    const { date }=this.props;

    return (
      <View style={styles.alarmHeaderContentWrap}>
        <View style={styles.headerControlAreaWrap}>
          <DateBox
            date={date} />
          <AlarmAddButton
            onPressOpenAlarmModal={this.onHandleOpenAlarmAddModal} />
        </View>
        <TitleHeader
          title="My Alarms" />
      </View>
    );
  }
}

export default AlarmHeader;
