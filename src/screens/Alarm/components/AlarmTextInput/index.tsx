import React, { Component } from 'react';
import {
  TextInput,
  ViewStyle
} from 'react-native';
import { TextInputField } from '../../../../models';
import StyleColors from '../../../../resources/style/colors';
import styles from './styles';

interface AlarmTextInputProps {
  textValue: string,
  onHandleSubmitEndEditing: (text: string) => void,
  onHandleSetAlarmTextInputRef?: (ref: TextInputField) => void,
  editableText?: boolean,
  onHandleSetDefaultAlarmTextInput?: (text: string) => void,
  style?: ViewStyle
}

interface AlarmTextInputState {
  alarmTextValue: string
}

class AlarmTextInput extends Component<AlarmTextInputProps, AlarmTextInputState> {
  private alarmTextInputRef: TextInputField;

  constructor(props: AlarmTextInputProps) {
    super(props);
    
    this.state={
      alarmTextValue: this.props.textValue
    };
  }

  onHandleSetAlarmTextInputRef=(ref: TextInputField) => {
    this.alarmTextInputRef=ref;

    if (this.props.onHandleSetAlarmTextInputRef) {
      this.props.onHandleSetAlarmTextInputRef(ref);
    }
  };

  onChangeAlarmTextInput=(alarmTextValue: string) => {
    this.setState({
      alarmTextValue
    });
  };

  onEndEditingAlarmTextInput=() => {
    this.props.onHandleSubmitEndEditing(this.state.alarmTextValue);
  };

  onFocusAlarmTextInput=() => {
    if (this.props.onHandleSetAlarmTextInputRef) {
      this.props.onHandleSetAlarmTextInputRef(this.alarmTextInputRef);
    }
  };

  componentDidMount(): void {
    if (this.props.onHandleSetDefaultAlarmTextInput) {
      this.props.onHandleSetDefaultAlarmTextInput(this.state.alarmTextValue);
    }
  }

  componentDidUpdate(prevProps: AlarmTextInputProps): void {
    if (prevProps.textValue !== this.props.textValue) {
      this.setState({
        alarmTextValue: this.props.textValue
      });
    }
  }

  render() {
    const {
      editableText=true,
      style
    }=this.props;

    return (
      <TextInput
        ref={this.onHandleSetAlarmTextInputRef}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        editable={editableText}
        maxLength={100}
        underlineColorAndroid="transparent"
        value={this.state.alarmTextValue}
        onChangeText={this.onChangeAlarmTextInput}
        onEndEditing={this.onEndEditingAlarmTextInput}
        blurOnSubmit={false}
        onFocus={this.onFocusAlarmTextInput}
        placeholder="Name"
        placeholderTextColor={StyleColors.DARK_GRAY}
        returnKeyType="done"
        style={[styles.alarmTextInput, style]} />
    );
  }
}

export default AlarmTextInput;
