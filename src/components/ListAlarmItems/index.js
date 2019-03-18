import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  SectionList
} from 'react-native';
import { connect } from 'react-redux';
import {
  editScheduledAlarm
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
  existScheduledDateTimeAlarm,
  checkEditScheduledAlarmItem
} from '../../utils/Validation';
import AlarmModal from '../Modals/AlarmModal';
import SectionHeaderListItems from '../SectionHeaderListItems';
import CardItemAlarm from '../CardItemAlarm';
import styles from './styles';

class ListAlarmItems extends Component {
  constructor(props) {
    super(props);

    this.currentOpenAlarm=null;
    this.scheduledTime=null;
    this.alarmNewTextValue=null;
    this.keyboardSpace=0;
    this.listScheduledAlarmItemsRef=React.createRef();

    this.state={
      showAlarmEditModal: false
    };

    this.onHandleKeyboardShow=(e) => {
      if (!this.keyboardSpace) {
        this.keyboardSpace=e.endCoordinates.screenY;
      }
    };

    this.onHandleKeyboardHide=() => {
      Keyboard.dismiss();

      this.listScheduledAlarmItemsRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
        x: 0,
        y: 0,
        animated: true
      });
    };

    this.onHandleOpenAlarmEditModal=(alarmItem, sectionListId) => {
      this.currentOpenAlarm={
        alarmItem,
        sectionListId
      };

      this.setState((prevState) => ({
        showAlarmEditModal: !prevState.showAlarmEditModal
      }));
    };

    this.onHandleCancelAlarmEditModal=(data) => {
      this.setState((prevState) => ({
        showAlarmEditModal: !prevState.showAlarmEditModal
      }));
    };

    this.onChangeTime=(time) => {
      this.scheduledTime=time;
    };

    this.onChangeCardItemSwitchValueAlarm=(switchValue, item, sectionListId) => {
      this.props.dispatch(editScheduledAlarm({
        switchValue,
        dateId: this.props.dateId,
        alarmId: item.id,
        sectionListId: sectionListId,
        text: item.text
      }));
    };

    this.onHandleSetDefaultAlarmTextInput=(text) => {
      this.alarmNewTextValue=text;
    };

    this.onHandleSubmitEndEditing=(newText, item, sectionListId) => {
      this.alarmNewTextValue=newText;

      if ((item && (newText !== item.text)) && !this.state.showAlarmEditModal) {
        this.props.dispatch(editScheduledAlarm({
          dateId: this.props.dateId,
          alarmId: item.id,
          sectionListId: sectionListId,
          text: newText
        }));
      }
    };

    this.onHandleSetCoordAlarmTextInput=(data) => {
      this.listScheduledAlarmItemsRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
        x: 0,
        y: (Math.round((data.height * 2) + data.pageY) - this.keyboardSpace),
        animated: true
      });
    };

    this.onHandleCloseSuccessAlarmEditModal=() => {
      if (checkScheduleCurrentTimeAlarm(this.scheduledTime)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULE_CURRENT_TIME_ALARM);
      } else if ((existScheduledDateTimeAlarm(this.props.scheduledAlarmList, this.scheduledTime) && checkEditScheduledAlarmItem(this.props.scheduledAlarmList, this.scheduledTime, this.currentOpenAlarm.alarmItem.id))
        || (this.alarmNewTextValue === null)) {
        onHandleAlarmAlertDialogBox('Error', ERROR_SCHEDULED_TIME_ALARM);
      } else {
        this.props.dispatch(editScheduledAlarm({
          dateId: this.props.dateId,
          alarmId: this.currentOpenAlarm.alarmItem.id,
          sectionListId: this.currentOpenAlarm.sectionListId,
          time: this.scheduledTime,
          text: this.alarmNewTextValue
        }));

        this.setState((prevState) => ({
          showAlarmEditModal: !prevState.showAlarmEditModal
        }));
      }
    };
  }

  componentDidMount() {
    this.keyboardShowListener=Keyboard.addListener('keyboardWillShow', this.onHandleKeyboardShow);
    this.keyboardHideListener=Keyboard.addListener('keyboardWillHide', this.onHandleKeyboardHide);
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <AlarmModal
          title="Rearrange"
          modeDatePicker="time"
          textValue={this.currentOpenAlarm && this.currentOpenAlarm.alarmItem.text}
          visible={this.state.showAlarmEditModal}
          onPressCancelAlarmModal={this.onHandleCancelAlarmEditModal}
          onPressCloseSuccessAlarmModal={this.onHandleCloseSuccessAlarmEditModal}
          onChangeDatePicker={this.onChangeTime}
          onHandleSetDefaultAlarmTextInput={this.onHandleSetDefaultAlarmTextInput}
          onHandleSubmitEndEditing={this.onHandleSubmitEndEditing} />
        <SectionList
          ref={this.listScheduledAlarmItemsRef}
          contentContainerStyle={{
            paddingVertical: 20
          }}
          sections={this.props.data}
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
              onHandleSubmitEndEditing={this.onHandleSubmitEndEditing}
              onHandleSetCoordAlarmTextInput={this.onHandleSetCoordAlarmTextInput} />
          )}
          stickySectionHeadersEnabled={false}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => `${item.id}`.toString()} />
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

export default connect(mapStateToProps)(ListAlarmItems);
