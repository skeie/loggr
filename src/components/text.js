import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { isAndroid } from '../utils/utils';


export const textStyle = StyleSheet.create({
  one: {
    fontFamily: isAndroid() ? "FredokaOne" : "Fredoka One",
    color:  'white'
  },
  regular: {
    fontFamily: isAndroid() ? "FredokaOne_Regular" : "FredokaOne-Regular",
    color: 'white'
  }
});

class SText extends Component {
  static defaultProps = {
    fontFamily: "one"
  };
  render() {

    const combineStyle = [this.props.style, textStyle[this.props.fontFamily]];
    return (
      <Text {...this.props} style={combineStyle}>
        {this.props.children}
      </Text>
    );
  }
}

export default SText;
