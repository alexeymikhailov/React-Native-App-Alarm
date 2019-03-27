import React from 'react';
import { Modal, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  getCurrentDateTime
} from '../../../../../resources/strings';
import SafeAreaView from '../../../../../common/components/SafeAreaView';
import TouchButton from '../../../../../common/components/TouchButton';
import TitleHeader from '../../../../../common/components/TitleHeader';
import AlarmTextInput from '../../AlarmTextInput';
import {
  AlarmModalWrap,
  AlarmModalHeaderContentWrap,
  TextAlarmModalHeaderContentCancel,
  TextAlarmModalHeaderContentCloseSuccess,
  AlarmModalDateTimePickerWrap,
  AlarmModalTextInputWrap,
  AlarmModalTextInput
} from './styles';

interface AlarmModalProps {
  title: string,
  minimumDatePicker: object | null,
  modeDatePicker: string,
  textValue: string,
  visible: boolean,
  onPressCancelAlarmModal: () => void,
  onPressCloseSuccessAlarmModal: () => void,
  onChangeDatePicker: (value: object) => void,
  onHandleSetDefaultAlarmTextInput: (textValue: string) => void,
  onHandleSubmitEndEditing: (textValue: string) => void,
  children?: () => React.ReactNode
}

const AlarmModal: React.FC<AlarmModalProps>=(props) => {
  const {
    title,
    minimumDatePicker,
    modeDatePicker,
    textValue,
    visible,
    onPressCancelAlarmModal,
    onPressCloseSuccessAlarmModal,
    onChangeDatePicker,
    onHandleSetDefaultAlarmTextInput,
    onHandleSubmitEndEditing,
    children
  }=props;

  return (
    <Modal
      animationType={"slide"}
      visible={visible}
      transparent={true}>
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="never"
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          <AlarmModalWrap>
            <AlarmModalHeaderContentWrap>
              <TouchButton
                onPress={onPressCancelAlarmModal}>
                <TextAlarmModalHeaderContentCancel>Cancel</TextAlarmModalHeaderContentCancel>
              </TouchButton>
              <TouchButton
                onPress={onPressCloseSuccessAlarmModal}>
                <TextAlarmModalHeaderContentCloseSuccess>Done</TextAlarmModalHeaderContentCloseSuccess>
              </TouchButton>
            </AlarmModalHeaderContentWrap>
            <TitleHeader
              title={title} />
            <AlarmModalDateTimePickerWrap>
              <DatePicker
                date={getCurrentDateTime()}
                minimumDate={minimumDatePicker}
                mode={modeDatePicker}
                onDateChange={onChangeDatePicker} />
            </AlarmModalDateTimePickerWrap>
            <AlarmModalTextInputWrap>
              <AlarmTextInput
                textValue={textValue !== 'null' ? textValue : ''}
                onHandleSetDefaultAlarmTextInput={onHandleSetDefaultAlarmTextInput}
                onHandleSubmitEndEditing={onHandleSubmitEndEditing}
                style={AlarmModalTextInput} />
            </AlarmModalTextInputWrap>
            { children && children() }
          </AlarmModalWrap>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AlarmModal;
