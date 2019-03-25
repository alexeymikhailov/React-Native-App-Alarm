import React, { Component } from 'react';
import {
  View,
  Keyboard,
  KeyboardEvent,
  EmitterSubscription,
  AppState
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import {
  deleteTriggeredAlarms
} from '../../../../actions';
import {
  CurrentOpenItem,
  ModalData,
  AlarmItem,
  AlarmState,
  TextInputField
} from '../../../../models';
import { getCurrentDateTime } from '../../../../resources/strings';
import AlarmModal from '../Modals/AlarmModal';
import NotificationService from '../../../../utils/NotificationService';
import NoScheduledAlarms from '../NoScheduledAlarms';
import AlarmHeader from '../AlarmHeader';
import ListAlarmItems from '../ListAlarmItems';
import styles from './styles';

interface AlarmSwiperContentProps {
  scheduledAlarmList: AlarmItem[],
  dispatch: Dispatch
}

interface AlarmSwiperContentState {
  showAlarmModal: boolean,
  title: string,
  minimumDatePicker: object | null,
  modeDatePicker: string,
  onHandleCloseSuccessAlarmModal?: (scheduledDateTime: object, alarmTextValue: string, currentOpenAlarm: CurrentOpenItem) => boolean
}

interface OpenedReceivedNotification {
  foreground: boolean
}

class AlarmSwiperContent extends Component<AlarmSwiperContentProps, AlarmSwiperContentState> {
  private currentOpenAlarm: CurrentOpenItem;
  private scheduledDateTime: object;
  private alarmTextValue: string;
  private scrollContainerRef: React.RefObject<any>=React.createRef();
  private alarmTextInputRef: TextInputField;
  private notificationService: NotificationService;
  private keyboardShowListener: EmitterSubscription;
  private keyboardHideListener: EmitterSubscription;

  constructor(props: AlarmSwiperContentProps) {
    super(props);

    this.state={
      showAlarmModal: false,
      title: '',
      minimumDatePicker: getCurrentDateTime(),
      modeDatePicker: 'datetime'
    };

    this.notificationService=new NotificationService(this.onHandleOpenedReceivedNotification);
    this.keyboardShowListener=Keyboard.addListener('keyboardWillShow', this.onHandleKeyboardShow);
    this.keyboardHideListener=Keyboard.addListener('keyboardWillHide', this.onHandleKeyboardHide);
  }

  onHandleOpenedReceivedNotification=(notification: OpenedReceivedNotification) => {
    if (notification.foreground) {
      this.props.dispatch(deleteTriggeredAlarms());
    }
  };

  onHandleAppStateChange=(appState: string) => {
    if (appState === 'active') {
      this.props.dispatch(deleteTriggeredAlarms());
    }
  };

  onHandleSetAlarmTextInputRef=(ref: TextInputField) => {
    this.alarmTextInputRef=ref;
  };

  onHandleKeyboardShow=(e: KeyboardEvent) => {
    if (this.alarmTextInputRef && this.scrollContainerRef) {
      this.alarmTextInputRef.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number): void => {
        const measureTextInput={
          x,
          y,
          width,
          height,
          pageX,
          pageY
        };

        this.scrollContainerRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
          x: 0,
          y: (Math.round((measureTextInput.height * 2) + measureTextInput.pageY) - e.endCoordinates.screenY),
          animated: true
        });
      });
    }
  };

  onHandleKeyboardHide=() => {
    if (this.alarmTextInputRef && this.scrollContainerRef) {
      Keyboard.dismiss();

      this.scrollContainerRef.current._wrapperListRef._listRef._scrollRef.scrollTo({
        x: 0,
        y: 0,
        animated: true
      });
    }
  };

  onHandleOpenAlarmModal=(modalData: ModalData) => {
    if (modalData.currentOpenAlarm) {
      this.currentOpenAlarm=modalData.currentOpenAlarm;
    }

    this.setState((prevState) => ({
      showAlarmModal: !prevState.showAlarmModal,
      ...modalData
    }));
  };

  onHandleCancelAlarmModal=() => {
    this.setState((prevState) => ({
      showAlarmModal: !prevState.showAlarmModal
    }));
  };

  onChangeDatePicker=(datetime: object) => {
    this.scheduledDateTime=datetime;
  };

  onHandleSetDefaultAlarmTextInputModal=(text: string) => {
    this.alarmTextValue=text;
  };

  onHandleSubmitEndEditingTextInputModal=(text: string) => {
    this.alarmTextValue=text;
  };

  onHandleCloseSuccessAlarmModal=() => {
    const executionResultCloseAlarmModal=this.state.onHandleCloseSuccessAlarmModal && this.state.onHandleCloseSuccessAlarmModal(this.scheduledDateTime, this.alarmTextValue, this.currentOpenAlarm);

    if (executionResultCloseAlarmModal) {
      this.setState((prevState) => ({
        showAlarmModal: !prevState.showAlarmModal
      }));
    }
  };

  componentDidMount(): void {
    AppState.addEventListener('change', this.onHandleAppStateChange);
  }

  componentWillUnmount(): void {
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
            scheduledAlarmList.length > 0 ? scheduledAlarmList.map((alarmItem): React.ReactNode => (
              <View
                style={styles.slideItemAlarmSwiperContentWrap}
                key={alarmItem.dateId}>
                <AlarmHeader
                  notificationService={this.notificationService}
                  date={alarmItem.date}
                  onHandleOpenAlarmAddModal={this.onHandleOpenAlarmModal}
                  {...this.props} />
                <ListAlarmItems
                  scrollContainerRef={this.scrollContainerRef}
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

const mapStateToProps=(state: AlarmState) => {
  const { scheduledAlarmList }=state;

  return {
    scheduledAlarmList
  };
};

export default connect(mapStateToProps)(AlarmSwiperContent);
