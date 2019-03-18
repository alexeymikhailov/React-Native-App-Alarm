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

    this.alarmTextInputRef=React.createRef();

    this.state={
      alarmTextValue: this.props.textValue,
      measureAlarmTextInput: {}
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
      if (this.props.onHandleSetCoordAlarmTextInput) {
        this.alarmTextInputRef.current.measure((x, y, width, height, pageX, pageY) => {
          this.props.onHandleSetCoordAlarmTextInput({
            height,
            pageY
          });
        });
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
      style,
      editableText=true
    }=this.props;

    return (
      <TextInput
        ref={this.alarmTextInputRef}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        editable={editableText}
        maxLength={100}
        underlineColorAndroid="transparent"
        value={this.state.alarmTextValue}
        onChangeText={this.onChangeAlarmTextInput}
        onEndEditing={this.onEndEditingAlarmTextInput}
        onFocus={this.onFocusAlarmTextInput}
        placeholder="Name"
        placeholderTextColor={StyleColors.DARK_GRAY}
        returnKeyType="done"
        style={[styles.alarmTextInput, style]} />
    );
  }
}

export default AlarmTextInput;
