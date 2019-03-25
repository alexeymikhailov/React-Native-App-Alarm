"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var TouchButton = function (props) { return (<react_native_1.TouchableOpacity onPress={props.onPress} activeOpacity={.5}>
    {props.children}
  </react_native_1.TouchableOpacity>); };
exports["default"] = TouchButton;
