import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Item,
  TextInputField
} from '../../../../models';
import AlarmTextInput from '../AlarmTextInput';
import StyleColors from '../../../../resources/style/colors';
import styles from './styles';

interface CardItemAlarmProps {
  item: Item,
  sectionListId: number,
  hourDifferentiationItem: string,
  onPressOpenAlarmModal: (item: Item, sectionListId: number) => void
  onChangeCardItemSwitchValueAlarm: (value: boolean, item: Item, sectionListId: number) => void
  onHandleSetAlarmTextInputRef: (ref: TextInputField) => void,
  onHandleSubmitEndEditing: (textValue: string, item: Item, sectionListId: number) => void,
}

const CardItemAlarm: React.FC<CardItemAlarmProps>=(props) => {
  const {
    item,
    sectionListId,
    hourDifferentiationItem,
    onPressOpenAlarmModal,
    onChangeCardItemSwitchValueAlarm,
    onHandleSetAlarmTextInputRef,
    onHandleSubmitEndEditing
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
                  false: StyleColors.WHITE,
                  true: StyleColors.BLACK
                }}
                onValueChange={(value) => onChangeCardItemSwitchValueAlarm(value, item, sectionListId)}
                value={item.isTurned} />
            </View>
          </View>
          <View style={styles.currentCardAlarmTextInputWrap}>
            <AlarmTextInput
              onHandleSetAlarmTextInputRef={onHandleSetAlarmTextInputRef}
              textValue={item.text !== 'null' ? item.text : ''}
              editableText={item.isTurned}
              onHandleSubmitEndEditing={(text) => onHandleSubmitEndEditing(text, item, sectionListId)} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardItemAlarm;
