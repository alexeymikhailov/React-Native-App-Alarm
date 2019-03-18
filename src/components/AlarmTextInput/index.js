import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';
import StyleColors from '../../style/colors';
import styles from './styles';

class AlarmTextInput extends Component {
  constructor(props) {
    super(props);

    this.alarmTextInputRef;

    this.state={
      alarmTextValue: this.props.textValue
    };

    this.onHandleSetAlarmTextInputRef=(ref) => {
      this.alarmTextInputRef=ref;

      if (this.props.setAlarmTextInputRef) {
        this.props.onHandleSetAlarmTextInputRef(ref);
      }
    };

    this.onChangeAlarmTextInput=(alarmTextValue) => {
      this.setState({
        alarmTextValue
      });
    };

    this.onEndEditingAlarmTextInput=() => {
      this.props.onHandleSubmitEndEditing(this.state.alarmTextValue);
    };

    this.onFocusAlarmTextInput=() => {
      if (this.props.onHandleSetAlarmTextInputRef) {
        this.props.onHandleSetAlarmTextInputRef(this.alarmTextInputRef);
      }
    };
  }

  componentDidMount() {
    if (this.props.onHandleSetDefaultAlarmTextInput) {
      this.props.onHandleSetDefaultAlarmTextInput(this.state.alarmTextValue);
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
