import { StyleSheet } from 'react-native';
import StyleColors from '../../../../resources/style/colors';

export default StyleSheet.create({
  currentCardItemAlarmWrap: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: StyleColors.LIGHT_GRAYISH_RED,
    borderRadius: 8
  },
  currentCardItemAlarmIconWrap: {
    alignSelf: 'center',
    marginRight: 10
  },
  currentCardItemAlarmContentDetailsWrap: {
    flex: 1
  },
  currentCardItemAlarmScheduledTimeWrap: {
    flexDirection: 'row'
  },
  textCardItemAlarmScheduledTime: {
    color: StyleColors.BLACK,
    fontSize: 65,
    fontWeight: '100'
  },
  currentCardItemAlarmSwitchWrap: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'center'
  },
  currentCardAlarmTextInputWrap: {
    bottom: 10
  },
  cardItemAlarmInput: {
    color: StyleColors.BLACK,
    fontSize: 17,
    fontWeight: '300'
  }
});
