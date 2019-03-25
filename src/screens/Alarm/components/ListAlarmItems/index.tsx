import React, { Component } from 'react';
import {
  View,
  SectionList,
  SectionListData
} from 'react-native';
import { Dispatch } from 'redux';
import { editScheduledAlarm } from '../../../../actions';
import { ERROR_SCHEDULED_TIME_ALARM } from '../../../../constants';
import {
  Item,
  CurrentOpenItem,
  ModalData,
  AlarmItem,
  TextInputField
} from '../../../../models';
import { getDateTimeAlarm } from '../../../../resources/strings';
import { onHandleAlarmAlertDialogBox } from '../../../../utils/Alerts';
import NotificationService from '../../../../utils/NotificationService';
import {
  existScheduledDateTimeAlarm,
  checkEditScheduledAlarmItem
} from '../../../../utils/Validation';
import SectionHeaderListItems from '../SectionHeaderListItems';
import CardItemAlarm from '../CardItemAlarm';
import styles from './styles';

interface RefObject<T> {
  readonly current: T | null
}

interface ListAlarmItemsProps {
  scrollContainerRef: RefObject<any>,
  notificationService: NotificationService,
  dateId: string,
  data: SectionListData<Item>[],
  onHandleSetAlarmTextInputRef: (textInputRef: TextInputField) => void,
  onHandleOpenAlarmEditModal: (modalData: ModalData) => void,
  scheduledAlarmList: AlarmItem[],
  dispatch: Dispatch,
  children?: React.ReactNode
}

class ListAlarmItems extends Component<ListAlarmItemsProps, {}> {
  onHandleOpenAlarmEditModal=(alarmItem: Item, sectionListId: number) => {
    const currentOpenAlarm: CurrentOpenItem={
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

  onChangeCardItemSwitchValueAlarm=(switchValue: boolean, item: Item, sectionListId: number) => {
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
        id: String(changeSwitchCurrentAlarm.alarmId),
        message: changeSwitchCurrentAlarm.text,
        date: getDateTimeAlarm({
          dateId: this.props.dateId,
          time: item.time
        })
      });

      return;
    }

    this.props.notificationService.onHandleEditLocalNotificationSchedule({
      id: String(changeSwitchCurrentAlarm.alarmId),
      message: changeSwitchCurrentAlarm.text,
      date: getDateTimeAlarm({
        dateId: this.props.dateId,
        time: item.time
      })
    });
  };

  onHandleSubmitEndEditing=(newText: string, item: Item, sectionListId: number) => {
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
        id: String(editTextCurrentAlarm.alarmId),
        message: editTextCurrentAlarm.text,
        date: getDateTimeAlarm({
          dateId: this.props.dateId,
          time: item.time
        })
      });
    }
  };

  onHandleCloseSuccessAlarmEditModal=(scheduledTime: object, alarmNewTextValue: string, currentOpenAlarm: CurrentOpenItem) => {
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
        id: String(editCurrentAlarm.alarmId),
        message: editCurrentAlarm.text,
        date: getDateTimeAlarm({
          dateId: this.props.dateId,
          time: editCurrentAlarm.time
        })
      });

      return true;
    }
  };

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
          keyExtractor={(item) => `${item.id}`.toString()} />
      </View>
    );
  }
}

export default React.forwardRef((props: ListAlarmItemsProps, ref?: React.Ref<any>) => (
  <ListAlarmItems
    scrollContainerRef={ref}
    {...props} />
));
