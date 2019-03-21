import React, { Component } from 'react';
import {
  Text,
  View,
  Keyboard,
  AppState
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import {
  deleteTriggeredAlarms
} from '../../../../actions';
import {
  ERROR_SCHEDULE_CURRENT_TIME_ALARM,
  ERROR_SCHEDULED_TIME_ALARM
} from '../../../../constants';
import {
  getCurrentDateTime
} from '../../../../resources/strings';
import {
  onHandleAlarmAlertDialogBox
} from '../../../../utils/Alerts';
import {
  checkScheduleCurrentTimeAlarm,
  existScheduledDateTimeAlarm
} from '../../../../utils/Validation';
import AlarmModal from '../Modals/AlarmModal';
import NotificationService from '../../../../utils/NotificationService';
import NoScheduledAlarms from '../NoScheduledAlarms';
import AlarmHeader from '../AlarmHeader';
import ListAlarmItems from '../ListAlarmItems';
import styles from './styles';

class AlarmSwiperContent extends Component {
  constructor(props) {
    super(props);

    this.alarmTextInputRef;
    this.currentOpenAlarm;
    this.scheduledDateTime;
    this.alarmTextValue;
    this.scrollContainerRef=React.createRef();
    this.notificationService=new NotificationService(this.onHandleOpenedReceivedNotif);

    this.state={
      showAlarmModal: false,
      title: '',
      minimumDatePicker: null,
      modeDatePicker: 'datetime'
    };

    this.onHandleAppStateChange=(appState) => {
      if (appState === 'active') {
        this.props.dispatch(deleteTriggeredAlarms());
      }
    };

    this.onHandleSetAlarmTextInputRef=(ref) => {
      this.alarmTextInputRef=ref;
    };

    this.onHandleKeyboardShow=(e) => {
      if (this.alarmTextInputRef && this.scrollContainerRef) {
        this.alarmTextInputRef.measure((x, y, width, height, pageX, pageY) => {
          this.scrollContainerRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
            x: 0,
            y: (Math.round((height * 2) + pageY) - e.endCoordinates.screenY),
            animated: true
          });
        });
      }
    };

    this.onHandleKeyboardHide=() => {
      if (this.alarmTextInputRef && this.scrollContainerRef) {
        Keyboard.dismiss();

        this.scrollContainerRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
          x: 0,
          y: 0,
          animated: true
        });
      }
    };

    this.onHandleOpenAlarmModal=(modalData) => {
      if (modalData.currentOpenAlarm) {
        this.currentOpenAlarm=modalData.currentOpenAlarm;
      }

      this.setState((prevState) => ({
        showAlarmModal: !prevState.showAlarmModal,
        ...modalData
      }));
    };

    this.onHandleCancelAlarmModal=() => {
      this.setState((prevState) => ({
        showAlarmModal: !prevState.showAlarmModal
      }));
    };

    this.onChangeDatePicker=(datetime) => {
      this.scheduledDateTime=datetime;
    };

    this.onHandleSetDefaultAlarmTextInputModal=(text) => {
      this.alarmTextValue=text;
    };

    this.onHandleSubmitEndEditingTextInputModal=(text) => {
      this.alarmTextValue=text;
    };

    this.onHandleCloseSuccessAlarmModal=() => {
      const executionResultCloseAlarmModal=this.state.onHandleCloseSuccessAlarmModal(this.scheduledDateTime, this.alarmTextValue, this.currentOpenAlarm);

      if (executionResultCloseAlarmModal) {
        this.setState((prevState) => ({
          showAlarmModal: !prevState.showAlarmModal
        }));
      }
    };
  }

  onHandleOpenedReceivedNotif=(notification) => {
    if (notification.foreground) {
      this.props.dispatch(deleteTriggeredAlarms());
    }
  };

  componentDidMount() {
    AppState.addEventListener('change', this.onHandleAppStateChange);
    this.keyboardShowListener=Keyboard.addListener('keyboardWillShow', this.onHandleKeyboardShow);
    this.keyboardHideListener=Keyboard.addListener('keyboardWillHide', this.onHandleKeyboardHide);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onHandleAppStateChange);
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  render() {
    const { scheduledAlarmList }=this.props;

    return (
      <View style={styles.alarmSwiperContentWrap}>
        <AlarmModal
          title={this.state.title}
          minimumDatePicker={this.state.minimumDatePicker}
          modeDatePicker={this.state.modeDatePicker}
          textValue={this.currentOpenAlarm && this.currentOpenAlarm.alarmItem.text || "Alarm"}
          visible={this.state.showAlarmModal}
          onPressCancelAlarmModal={this.onHandleCancelAlarmModal}
          onPressCloseSuccessAlarmModal={this.onHandleCloseSuccessAlarmModal}
          onChangeDatePicker={this.onChangeDatePicker}
          onHandleSetDefaultAlarmTextInput={this.onHandleSetDefaultAlarmTextInputModal}
          onHandleSubmitEndEditing={this.onHandleSubmitEndEditingTextInputModal} />
        <Swiper
          loop={true}
          index={0}
          showsButtons={false}
          showsPagination={false}>
          {
            scheduledAlarmList.length > 0 ? scheduledAlarmList.map((alarmItem) => (
              <View
                style={styles.slideItemAlarmSwiperContentWrap}
                key={alarmItem.dateId}>
                <AlarmHeader
                  notificationService={this.notificationService}
                  date={alarmItem.date}
                  onHandleOpenAlarmAddModal={this.onHandleOpenAlarmModal}
                  {...this.props} />
                <ListAlarmItems
                  ref={this.scrollContainerRef}
                  notificationService={this.notificationService}
                  dateId={alarmItem.dateId}
                  data={alarmItem.data}
                  onHandleSetAlarmTextInputRef={this.onHandleSetAlarmTextInputRef}
                  onHandleOpenAlarmEditModal={this.onHandleOpenAlarmModal}
                  {...this.props} />
              </View>
            )) : (
              <View style={styles.slideItemAlarmSwiperContentWrap}>
                <AlarmHeader
                  notificationService={this.notificationService}
                  onHandleOpenAlarmAddModal={this.onHandleOpenAlarmModal}
                  {...this.props} />
                <NoScheduledAlarms />
              </View>
            )
          }
        </Swiper>
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

export default connect(mapStateToProps)(AlarmSwiperContent);
