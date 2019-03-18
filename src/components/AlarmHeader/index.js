import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  scheduleNewAlarm
} from '../../actions';
import {
  ERROR_SCHEDULE_CURRENT_TIME_ALARM,
  ERROR_SCHEDULED_TIME_ALARM
} from '../../constants';
import {
  onHandleAlarmAlertDialogBox
} from '../../utils/Alerts';
import {
  checkScheduleCurrentTimeAlarm,
  existScheduledDateTimeAlarm
} from '../../utils/Validation';
import AlarmModal from '../Modals/AlarmModal';
import DateBox from '../DateBox';
import AlarmAddButton from '../AlarmAddButton';
import TitleHeader from '../TitleHeader';
import styles from './styles';

class AlarmHeader extends Component {
  constructor(props) {
    super(props);

    this.scheduledDateTime;
    this.alarmTextValue=null;

    this.state={
      showAlarmAddModal: false
    };

    this.onHandleOpenAlarmAddModal=() => {
      this.setState((prevState) => ({
        showAlarmAddModal: !prevState.showAlarmAddModal
      }));
    };

    this.onHandleCancelAlarmAddModal=() => {
      this.setState((prevState) => ({
        showAlarmAddModal: !prevState.showAlarmAddModal
      }));
    };

    this.onChangeDateTime=(datetime) => {
      this.scheduledDateTime=datetime;
    };

    this.onHandleSetDefaultAlarmTextInput=(text) => {
      this.alarmTextValue=text;
    };

    this.onHandleSubmitEndEditing=(text) => {
      this.alarmTextValue=text;
    };

    this.onHandleCloseSuccessAlarmAddModal=() => {
      if (checkScheduleCurrentTimeAlarm(this.scheduledDateTime)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULE_CURRENT_TIME_ALARM);
      } else if (existScheduledDateTimeAlarm(this.props.scheduledAlarmList, this.scheduledDateTime)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULED_TIME_ALARM);
      } else {
        this.props.dispatch(scheduleNewAlarm({
          datetime: this.scheduledDateTime,
          text: this.alarmTextValue
        }));

        this.setState((prevState) => ({
          showAlarmAddModal: !prevState.showAlarmAddModal
        }));
      }
    };
  }

  render() {
    const { date }=this.props;

    return (
      <View style={styles.alarmHeaderContentWrap}>
        <AlarmModal
          title="Adding"
          minimumDatePicker={moment().toDate()}
          modeDatePicker="datetime"
          textValue="Alarm"
          visible={this.state.showAlarmAddModal}
          onPressCancelAlarmModal={this.onHandleCancelAlarmAddModal}
          onPressCloseSuccessAlarmModal={this.onHandleCloseSuccessAlarmAddModal}
          onChangeDatePicker={this.onChangeDateTime}
          onHandleSetDefaultAlarmTextInput={this.onHandleSetDefaultAlarmTextInput}
          onHandleSubmitEndEditing={this.onHandleSubmitEndEditing} />
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

const mapStateToProps=(state) => {
  const {
    scheduledAlarmList
  }=state;

  return {
    scheduledAlarmList
  };
};

export default connect(mapStateToProps)(AlarmHeader);
