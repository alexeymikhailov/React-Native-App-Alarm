import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AlarmTextInput from '../AlarmTextInput';
import StyleColors from '../../style/colors';
import styles from './styles';

const CardItemAlarm=(props) => {
  const {
    item,
    sectionListId,
    hourDifferentiationItem,
    onPressOpenAlarmModal,
    onChangeCardItemSwitchValueAlarm,
    onHandleSubmitEndEditing,
    onHandleSetCoordAlarmTextInput
  }=props;

  return (
    <TouchableOpacity
      disabled={!item.isTurned}
      onPress={() => onPressOpenAlarmModal(item, sectionListId)}
      activeOpacity={.5}>
      <View style={[styles.currentCardItemAlarmWrap, {
        opacity: item.isTurned ? 1 : .5
      }]}>
        <View style={styles.currentCardItemAlarmIconWrap}>
          <Icon
            name={hourDifferentiationItem == 'Day' ? "ios-sunny" : "ios-moon"}
            size={34}
            color={!item.isTurned
                ? StyleColors.BLACK
                  : hourDifferentiationItem == 'Day'
                    ? StyleColors.VIVID_YELLOW
                      : StyleColors.DARK_BLUE} />
        </View>
        <View style={styles.currentCardItemAlarmContentDetailsWrap}>
          <View style={styles.currentCardItemAlarmScheduledTimeWrap}>
            <View>
              <Text style={styles.textCardItemAlarmScheduledTime}>
                {item.time}
              </Text>
            </View>
            <View style={styles.currentCardItemAlarmSwitchWrap}>
              <Switch
                trackColor={{
                  true: StyleColors.BLACK
                }}
                onValueChange={(value) => onChangeCardItemSwitchValueAlarm(value, item, sectionListId)}
                value={item.isTurned} />
            </View>
          </View>
          <View style={styles.currentCardAlarmTextInputWrap}>
            <AlarmTextInput
              textValue={item.text}
              editableText={item.isTurned}
              onHandleSubmitEndEditing={(text) => onHandleSubmitEndEditing(text, item, sectionListId)}
              onHandleSetCoordAlarmTextInput={onHandleSetCoordAlarmTextInput} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardItemAlarm;
