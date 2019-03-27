import React from 'react';
import {
  DateBoxContentWrap,
  TextDateBox
} from './styles';

interface DateBoxProps {
  date?: string
}

const DateBox: React.FC<DateBoxProps>=(props) => (
  <DateBoxContentWrap>
    <TextDateBox numberOfLines={1}>
      {props.date || 'Set the alarm'}
    </TextDateBox>
  </DateBoxContentWrap>
);

export default DateBox;
