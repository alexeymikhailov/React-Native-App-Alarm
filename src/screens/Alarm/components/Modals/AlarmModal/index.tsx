import React from 'react';
import {
  Text,
  View,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DatePicker from 'react-native-date-picker';
import {
  getCurrentDateTime
} from '../../../../../resources/strings';
import TouchButton from '../../../../../common/components/TouchButton';
import TitleHeader from '../../../../../common/components/TitleHeader';
import AlarmTextInput from '../../AlarmTextInput';
import styles from './styles';

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
      <SafeAreaView
        style={styles.alarmModalContainer}
        forceInset={{
          top: 'always',
          bottom: 'always',
          horizontal: 'never'
        }}>
        <View style={styles.alarmModalWrap}>
          <View style={styles.alarmModalHeaderContentWrap}>
            <TouchButton
              onPress={onPressCancelAlarmModal}>
              <Text style={styles.textAlarmModalHeaderContentCancel}>Cancel</Text>
            </TouchButton>
            <TouchButton
              onPress={onPressCloseSuccessAlarmModal}>
              <Text style={styles.textAlarmModalHeaderContentCloseSuccess}>Done</Text>
            </TouchButton>
          </View>
          <TitleHeader
            title={title} />
          <View style={styles.alarmModalDateTimePickerWrap}>
            <DatePicker
              date={getCurrentDateTime()}
              minimumDate={minimumDatePicker}
              mode={modeDatePicker}
              onDateChange={onChangeDatePicker} />
          </View>
          <View style={styles.alarmModalTextInputWrap}>
            <AlarmTextInput
              textValue={textValue !== 'null' ? textValue : ''}
              onHandleSetDefaultAlarmTextInput={onHandleSetDefaultAlarmTextInput}
              onHandleSubmitEndEditing={onHandleSubmitEndEditing}
              style={styles.alarmModalTextInput} />
          </View>
          { children && children() }
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AlarmModal;
