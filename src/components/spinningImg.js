import React, { Component } from "react";
import { Animated, Easing } from "react-native";
import { loadingImg } from "../Images";
class SpinningImg extends Component {
  state = {
    spinning: new Animated.Value(0)
  };

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    this.state.spinning.setValue(0);
    Animated.timing(this.state.spinning, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }).start(animation => {
      console.log("sapdap", animation);
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
    return <Animated.Image source={loadingImg} style={squareAnimation} />;
  }
}

export default SpinningImg;
