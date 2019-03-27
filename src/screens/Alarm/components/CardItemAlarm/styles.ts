import styled from '@emotion/native';
import StyleColors from '../../../../resources/style/colors';

export const CurrentCardItemAlarmWrap=styled.View`
  flex-direction: row;
  padding-horizontal: 10px;
  background-color: ${StyleColors.LIGHT_GRAYISH_RED};
  border-radius: 8px;
`;

export const CurrentCardItemAlarmIconWrap=styled.View`
  align-self: center;
  margin-right: 10px;
`;

export const CurrentCardItemAlarmContentDetailsWrap=styled.View`
  flex: 1;
`;

export const CurrentCardItemAlarmScheduledTimeWrap=styled.View`
  flex-direction: row;
`;

export const TextCardItemAlarmScheduledTime=styled.Text`
  color: ${StyleColors.BLACK};
  font-size: 65;
  font-weight: 100;
`;

export const CurrentCardItemAlarmSwitchWrap=styled.View`
  flex: 1;
  align-items: flex-end;
  align-self: center;
`;

export const CurrentCardAlarmTextInputWrap=styled.View`
  bottom: 10px;
`;

export const CardItemAlarmInput=styled.View`
  color: ${StyleColors.BLACK};
  font-size: 17;
  font-weight: 300;
`;
