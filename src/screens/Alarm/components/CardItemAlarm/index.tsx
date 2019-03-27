import React from 'react';
import {
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
import {
  CurrentCardItemAlarmWrap,
  CurrentCardItemAlarmIconWrap,
  CurrentCardItemAlarmContentDetailsWrap,
  CurrentCardItemAlarmScheduledTimeWrap,
  TextCardItemAlarmScheduledTime,
  CurrentCardItemAlarmSwitchWrap,
  CurrentCardAlarmTextInputWrap
} from './styles';

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
      <CurrentCardItemAlarmWrap style={{
        opacity: item.isTurned ? 1 : .5
      }}>
        <CurrentCardItemAlarmIconWrap>
          <Icon
            name={hourDifferentiationItem == 'Day' ? "ios-sunny" : "ios-moon"}
            size={34}
            color={!item.isTurned
                ? StyleColors.BLACK
                  : hourDifferentiationItem == 'Day'
                    ? StyleColors.VIVID_YELLOW
                      : StyleColors.DARK_BLUE} />
        </CurrentCardItemAlarmIconWrap>
        <CurrentCardItemAlarmContentDetailsWrap>
          <CurrentCardItemAlarmScheduledTimeWrap>
            <View>
              <TextCardItemAlarmScheduledTime>
                {item.time}
              </TextCardItemAlarmScheduledTime>
            </View>
            <CurrentCardItemAlarmSwitchWrap>
              <Switch
                trackColor={{
                  false: StyleColors.WHITE,
                  true: StyleColors.BLACK
                }}
                onValueChange={(value) => onChangeCardItemSwitchValueAlarm(value, item, sectionListId)}
                value={item.isTurned} />
            </CurrentCardItemAlarmSwitchWrap>
          </CurrentCardItemAlarmScheduledTimeWrap>
          <CurrentCardAlarmTextInputWrap>
            <AlarmTextInput
              onHandleSetAlarmTextInputRef={onHandleSetAlarmTextInputRef}
              textValue={item.text !== 'null' ? item.text : ''}
              editableText={item.isTurned}
              onHandleSubmitEndEditing={(text) => onHandleSubmitEndEditing(text, item, sectionListId)} />
          </CurrentCardAlarmTextInputWrap>
        </CurrentCardItemAlarmContentDetailsWrap>
      </CurrentCardItemAlarmWrap>
    </TouchableOpacity>
  );
}

export default CardItemAlarm;
