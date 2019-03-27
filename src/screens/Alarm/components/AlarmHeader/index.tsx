import React, { Component } from 'react';
import { Dispatch } from 'redux';
import Icon from 'react-native-vector-icons/Feather';
import { scheduleNewAlarm } from '../../../../actions';
import { ERROR_SCHEDULED_TIME_ALARM } from '../../../../constants';
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
import { existScheduledDateTimeAlarm } from '../../../../utils/Validation';
import DateBox from '../DateBox';
import TouchButton from '../../../../common/components/TouchButton';
import TitleHeader from '../../../../common/components/TitleHeader';
import StyleColors from '../../../../resources/style/colors';
import {
  AlarmHeaderContentWrap,
  HeaderControlAreaWrap
} from './styles';

interface CardItemAlarmProps {
  notificationService: NotificationService,
  onHandleOpenAlarmAddModal: (modalData: ModalData) => void,
  scheduledAlarmList: AlarmItem[],
  dispatch: Dispatch,
  date?: string
}

class AlarmHeader extends Component<CardItemAlarmProps, {}> {
  private onHandleOpenAlarmAddModal=() => {
    this.props.onHandleOpenAlarmAddModal({
      title: 'Adding',
      datePicker: getCurrentDateTime(),
      minimumDatePicker: getCurrentDateTime(),
      modeDatePicker: 'datetime',
      onHandleCloseSuccessAlarmModal: this.onHandleCloseSuccessAlarmAddModal
    });
  };

  private onHandleCloseSuccessAlarmAddModal=(scheduledDateTime: object, alarmTextValue: string) => {
    if (existScheduledDateTimeAlarm(this.props.scheduledAlarmList, scheduledDateTime)) {
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

  public render() {
    const { date }=this.props;

    return (
      <AlarmHeaderContentWrap>
        <HeaderControlAreaWrap>
          <DateBox
            date={date} />
          <TouchButton
            onPress={this.onHandleOpenAlarmAddModal}>
            <Icon
              name="plus"
              size={30}
              color={StyleColors.BLACK} />
          </TouchButton>
        </HeaderControlAreaWrap>
        <TitleHeader
          title="My Alarms" />
      </AlarmHeaderContentWrap>
    );
  }
}

export default AlarmHeader;
