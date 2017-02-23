import React, { Component } from "react";
import { Animated, Easing, View } from "react-native";
import { loadingImg } from "../Images";
import quotes from "./quotes";
import Text from "./text";

class SpinningImg extends Component {
  state = {
    spinning: new Animated.Value(0)
  };

  componentDidMount() {
    this.quote = quotes[Math.floor(Math.random() * (quotes.length - 0) + 0)];
    this.spin();
  }

  spin = () => {
    this.state.spinning.setValue(0);
    Animated
      .timing(this.state.spinning, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear
      })
      .start(animation => {
        if (animation.finished) {
          this.spin();
        }
      });
  };

  render() {
    const edgeLength = 100;
    const squareAnimation = {
      height: edgeLength,
      width: edgeLength,
      transform: [
        {
          rotate: this.state.spinning.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
          })
        }
      ]
    };
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16
        }}
      >
        <Animated.Image source={loadingImg} style={squareAnimation} />
        <Text style={{ fontSize: 20, marginTop: 10 }}>{this.quote}</Text>
      </View>
    );
  }
}

export default SpinningImg;
