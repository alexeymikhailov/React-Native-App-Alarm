import { StyleSheet } from 'react-native';
import StyleColors from '../../../../resources/style/colors';

export default StyleSheet.create({
  noScheduledAlarmsContentWrap: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noScheduledAlarmsIconWrap: {
    marginBottom: 15
  },
  textNoScheduledAlarms: {
    color: StyleColors.BLACK,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '200'
  }
});
