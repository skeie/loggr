import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  one: {
    fontFamily: "Fredoka One"
  },
  regular: {
    fontFamily: "FredokaOne-Regular"
  }
});

class SText extends Component {
  static defaultProps = {
    fontFamily: "one"
  };
  render() {
    debugger;
    const combineStyle = [this.props.style, styles[this.props.fontFamily]];
    return (
      <Text {...this.props} style={combineStyle}>
        {this.props.children}
      </Text>
    );
  }
}

export default SText;
