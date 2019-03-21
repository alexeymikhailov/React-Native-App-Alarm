import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  getCurrentDateTime
} from '../../../../../resources/strings';
import TitleHeader from '../../TitleHeader';
import AlarmTextInput from '../../AlarmTextInput';
import StyleColors from '../../../../../resources/style/colors';
import styles from './styles';

const AlarmModal=(props) => {
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
            <TouchableOpacity
              onPress={onPressCancelAlarmModal}
              activityOpacity={.5}>
              <Text style={styles.textAlarmModalHeaderContentCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressCloseSuccessAlarmModal}
              activityOpacity={.5}>
              <Text style={styles.textAlarmModalHeaderContentCloseSuccess}>Done</Text>
            </TouchableOpacity>
          </View>
          <TitleHeader
            title={title} />
          <View style={styles.alarmModalDateTimePickerWrap}>
            <DatePicker
              date={getCurrentDateTime()}
              minimumDate={minimumDatePicker}
              mode={modeDatePicker}
              onDateChange={(value) => onChangeDatePicker(value)} />
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
