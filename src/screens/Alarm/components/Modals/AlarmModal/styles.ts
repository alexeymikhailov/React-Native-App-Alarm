import { StyleSheet } from 'react-native';
import StyleColors from '../../../../../resources/style/colors';

export default StyleSheet.create({
  alarmModalContainer: {
    flex: 1,
    backgroundColor: StyleColors.LIGHT_RED
  },
  alarmModalWrap: {
    paddingTop: 10,
    paddingHorizontal: 15
  },
  alarmModalHeaderContentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textAlarmModalHeaderContentCancel: {
    color: StyleColors.DARK_BLUE,
    fontSize: 18,
    fontWeight: '300'
  },
  textAlarmModalHeaderContentCloseSuccess: {
    color: StyleColors.DARK_BLUE,
    fontSize: 18,
    fontWeight: '300'
  },
  alarmModalDateTimePickerWrap: {
    alignItems: 'center'
  },
  alarmModalTextInputWrap: {
    marginTop: 10
  },
  alarmModalTextInput: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: StyleColors.GRAYISH_ORANGE,
    borderRadius: 4
  }
});
