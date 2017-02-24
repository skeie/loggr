import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import Text from "../text";
import { borderGreen, hulkGreen, white } from "../../styles";
import { connect } from "react-redux";
import {
  updateText,
  toggleKeyboard,
  removeLastChar,
  nextActive
} from "./keyboardActions";
import { buttons } from "../../Images";
const { width, height } = Dimensions.get("window");

const viewHeight = height / 3;
const elementHeight = viewHeight / 4;

const styles = StyleSheet.create({
  element: {
    width: width / 3,
    alignItems: "center",
    justifyContent: "center",
    height: elementHeight,
    borderWidth: 5,
    borderRadius: 2,
    backgroundColor: "red"
  },
  elementColor: {
    color: "#6D1B15"
  },
  NextBtn: {
    backgroundColor: "#3871B5",
    justifyContent: "center",
    alignItems: "center",
    width,
    height: elementHeight
  },
  text: {
    fontSize: 20
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Element extends Component {
  state = {
    showBroken: false
  };
  onPress = () => {
    this.showBrokenImage();
    this.props.onPress(this.props.image);
  };

  showBrokenImage = () => {
    this.toggleState(true, () => {
      setTimeout(
        () => {
          this.toggleState(false, () => {});
        },
        500
      );
    });
  };

  toggleState = (showBroken, cb) => {
    this.setState(
      {
        showBroken
      },
      cb
    );
  };

  render() {
    const { image, isNumber } = this.props;
    // const imageWidth = isNumber ? widt;
    const source = buttons[image][this.state.showBroken ? "broken" : "clean"];
    return (
      <TouchableOpacity onPress={this.onPress} style={styles.element}>
        <Image
          style={{ height: elementHeight, width: width / 3 }}
          source={source}
        />
      </TouchableOpacity>
    );
  }
}

const NextBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.NextBtn}>
    <Text style={styles.text}>Oorah!!</Text>
  </TouchableOpacity>
);

class Keyboard extends Component {
  onPress = text => {
    if (text.indexOf("KG") >= 0) {
      text = text + " * ";
    }
    this.props.dispatch(updateText(text));
  };

  onNext = () => {
    this.props.dispatch(nextActive());
  };

  onFailPress = () => {
    this.props.dispatch(removeLastChar());
  };

  render() {
    // <NextBtn onPress={this.onNext} />
    const { showKeyboard } = this.props;
    return showKeyboard
      ? <View style={styles.container}>
          <Element image="1" isNumber onPress={this.onPress} />
          <Element image="2" isNumber onPress={this.onPress} />
          <Element image="3" isNumber onPress={this.onPress} />
          <Element image="4" isNumber onPress={this.onPress} />
          <Element image="5" isNumber onPress={this.onPress} />
          <Element image="6" isNumber onPress={this.onPress} />
          <Element image="7" isNumber onPress={this.onPress} />
          <Element image="8" isNumber onPress={this.onPress} />
          <Element image="9" isNumber onPress={this.onPress} />
          <Element image="FAIL" onPress={this.onFailPress} />
          <Element image="0" isNumber onPress={this.onPress} />
          <Element image="KG" onPress={this.onPress} />
        </View>
      : null;
  }
}

export default connect(({ keyboard }) => ({
  showKeyboard: keyboard.get("showKeyboard")
}))(Keyboard);
