import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  one: {
    fontFamily: "Fredoka One",
    color:  'white'
  },
  regular: {
    fontFamily: "FredokaOne-Regular",
    color: 'white'
  }
});

class SText extends Component {
  static defaultProps = {
    fontFamily: "one"
  };
  render() {

    const combineStyle = [this.props.style, styles[this.props.fontFamily]];
    return (
      <Text {...this.props} style={combineStyle}>
        {this.props.children}
      </Text>
    );
  }
}

export default SText;
