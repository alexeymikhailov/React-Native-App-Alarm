import React from 'react';
import {
  ContentTitleHeaderTextWrap,
  TextTitleHeader
} from './styles';

interface TitleHeaderProps {
  title: string
}

const TitleHeader: React.FC<TitleHeaderProps>=(props) => (
  <ContentTitleHeaderTextWrap>
    <TextTitleHeader>{props.title}</TextTitleHeader>
  </ContentTitleHeaderTextWrap>
);

export default TitleHeader;
