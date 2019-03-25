import React from 'react';
import { TouchableOpacity } from 'react-native';

interface TouchButtonProps {
  onPress: () => void,
  children: React.ReactNode
}

const TouchButton: React.FC<TouchButtonProps>=(props) => (
  <TouchableOpacity
    onPress={props.onPress}
    activeOpacity={.5}>
    { props.children }
  </TouchableOpacity>
);

export default TouchButton;
