import styled, { css } from '@emotion/native';
import StyleColors from '../../../../../resources/style/colors';

export const AlarmModalWrap=css`
  padding-top: 10px;
  padding-horizontal: 15px;
`;

export const AlarmModalHeaderContentWrap=styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TextAlarmModalHeaderContentCancel=styled.Text`
  color: ${StyleColors.DARK_BLUE};
  font-size: 18;
  font-weight: 300;
`;

export const TextAlarmModalHeaderContentCloseSuccess=styled.Text`
  color: ${StyleColors.DARK_BLUE};
  font-size: 18;
  font-weight: 300;
`;

export const AlarmModalDateTimePickerWrap=styled.View`
  align-items: center;
`;

export const AlarmModalTextInputWrap=styled.View`
  margin-top: 10px;
`;

export const AlarmModalTextInput=css`
  padding-vertical: 7px;
  padding-horizontal: 15px;
  background-color: ${StyleColors.GRAYISH_ORANGE};
  border-radius: 4px;
`;
