import React from "react";
import {
  View,
  DeviceEventEmitter,
  Dimensions,
  Keyboard,
  Platform
} from "react-native";
import { keyboardHeightChange } from "./controllerActions";
import { connect } from "react-redux";

class KeyboardController extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const updateListener = Platform.OS === "android"
      ? "keyboardDidShow"
      : "keyboardWillShow";
    const resetListener = Platform.OS === "android"
      ? "keyboardDidHide"
      : "keyboardWillHide";
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace)
      //Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ];
    DeviceEventEmitter.addListener(
      resetListener,
      this.keyboardWillHide
    );
  }

  updateKeyboardSpace = e => {
    const newSize = Dimensions.get("window").height - e.endCoordinates.height;
    this.updateKeyboardSpace(newSize);
  };

  updateKeyboardSpace = newSize => {
    if (this.newSize != newSize) {
      this.newSize = newSize;
      this.props.dispatch(keyboardHeightChange(newSize));
    }
  };

  keyboardWillHide = e => {
    this.updateKeyboardSpace(0);
  };

  render() {
    return null;
  }
}

export default connect()(KeyboardController);
