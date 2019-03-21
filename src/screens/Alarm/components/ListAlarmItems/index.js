import React, { Component } from 'react';
import {
  Text,
  View,
  SectionList
} from 'react-native';
import {
  editScheduledAlarm
} from '../../../../actions';
import {
  ERROR_SCHEDULED_TIME_ALARM
} from '../../../../constants';
import {
  getDateTimeAlarm
} from '../../../../resources/strings';
import {
  onHandleAlarmAlertDialogBox
} from '../../../../utils/Alerts';
import {
  existScheduledDateTimeAlarm,
  checkEditScheduledAlarmItem
} from '../../../../utils/Validation';
import SectionHeaderListItems from '../SectionHeaderListItems';
import CardItemAlarm from '../CardItemAlarm';
import styles from './styles';

class ListAlarmItems extends Component {
  constructor(props) {
    super(props);

    this.onHandleOpenAlarmEditModal=(alarmItem, sectionListId) => {
      const currentOpenAlarm={
        alarmItem,
        sectionListId
      };

      this.props.onHandleOpenAlarmEditModal({
        currentOpenAlarm,
        title: 'Rearrange',
        minimumDatePicker: null,
        modeDatePicker: 'time',
        onHandleCloseSuccessAlarmModal: this.onHandleCloseSuccessAlarmEditModal
      });
    };

    this.onChangeCardItemSwitchValueAlarm=(switchValue, item, sectionListId) => {
      const changeSwitchCurrentAlarm={
        switchValue,
        dateId: this.props.dateId,
        alarmId: item.id,
        sectionListId: sectionListId,
        time: item.time,
        text: item.text
      };

      this.props.dispatch(editScheduledAlarm(changeSwitchCurrentAlarm));

      if (!switchValue) {
        this.props.notificationService.onHandleCancelLocalNotificationSchedule({
          id: changeSwitchCurrentAlarm.alarmId
        });

        return;
      }

      this.props.notificationService.onHandleEditLocalNotificationSchedule({
        id: changeSwitchCurrentAlarm.alarmId,
        message: changeSwitchCurrentAlarm.text,
        date: getDateTimeAlarm({
          dateId: this.props.dateId,
          time: item.time
        })
      });
    };

    this.onHandleSubmitEndEditing=(newText, item, sectionListId) => {
      if (item && (newText !== item.text)) {
        const editTextCurrentAlarm={
          dateId: this.props.dateId,
          alarmId: item.id,
          sectionListId: sectionListId,
          time: item.time,
          text: newText
        };

        this.props.dispatch(editScheduledAlarm(editTextCurrentAlarm));
        this.props.notificationService.onHandleEditLocalNotificationSchedule({
          id: editTextCurrentAlarm.alarmId,
          message: editTextCurrentAlarm.text,
          date: getDateTimeAlarm({
            dateId: this.props.dateId,
            time: item.time
          })
        });
      }
    };

    this.onHandleCloseSuccessAlarmEditModal=(scheduledTime, alarmNewTextValue, currentOpenAlarm) => {
      if ((existScheduledDateTimeAlarm(this.props.scheduledAlarmList, scheduledTime)
        && checkEditScheduledAlarmItem(this.props.scheduledAlarmList, scheduledTime, currentOpenAlarm.alarmItem.id))
        || (alarmNewTextValue === null)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULED_TIME_ALARM);
        return false;
      } else {
        const editCurrentAlarm={
          dateId: this.props.dateId,
          alarmId: currentOpenAlarm.alarmItem.id,
          sectionListId: currentOpenAlarm.sectionListId,
          time: scheduledTime,
          text: alarmNewTextValue
        };

        this.props.dispatch(editScheduledAlarm(editCurrentAlarm));
        this.props.notificationService.onHandleEditLocalNotificationSchedule({
          id: editCurrentAlarm.alarmId,
          message: editCurrentAlarm.text,
          date: getDateTimeAlarm({
            dateId: this.props.dateId,
            time: editCurrentAlarm.time
          })
        });

        return true;
      }
    };
  }

  render() {
    const {
      scrollContainerRef,
      data,
      onHandleSetAlarmTextInputRef
    }=this.props;

    return (
      <View style={{
        flex: 1
      }}>
        <SectionList
          ref={scrollContainerRef}
          contentContainerStyle={{
            paddingVertical: 20
          }}
          sections={data}
          ItemSeparatorComponent={() => (
            <View style={styles.separatorAlarmStyle} />
          )}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <SectionHeaderListItems
              section={section.hourDifferentiation} />
          )}
          renderItem={({ item, section }) => (
            <CardItemAlarm
              item={item}
              sectionListId={section.id}
              hourDifferentiationItem={section.hourDifferentiation}
              onPressOpenAlarmModal={this.onHandleOpenAlarmEditModal}
              onChangeCardItemSwitchValueAlarm={this.onChangeCardItemSwitchValueAlarm}
              onHandleSetAlarmTextInputRef={onHandleSetAlarmTextInputRef}
              onHandleSubmitEndEditing={this.onHandleSubmitEndEditing} />
          )}
          stickySectionHeadersEnabled={false}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => `${item.id}`.toString()} />
      </View>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <ListAlarmItems
    {...props}
    scrollContainerRef={ref} />
));
