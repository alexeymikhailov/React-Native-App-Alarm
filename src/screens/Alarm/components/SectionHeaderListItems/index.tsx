import React from 'react';
import {
  SectionHeaderListItemsContentWrap,
  TextSectionHeaderListItems
} from './styles';

interface SectionHeaderListItemsProps {
  section: string
}

const SectionHeaderListItems: React.FC<SectionHeaderListItemsProps>=(props) => (
  <SectionHeaderListItemsContentWrap>
    <TextSectionHeaderListItems>
      {props.section}
    </TextSectionHeaderListItems>
  </SectionHeaderListItemsContentWrap>
);

export default SectionHeaderListItems;
