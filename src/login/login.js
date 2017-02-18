import React, { Component } from "react";
import { Image, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { width, height } from "../utils/utils";
import { facebookLogin } from "./facebooklogin";
import { login } from "../user/userAction";
import { connect } from "react-redux";
import { hulk, loginBtn } from "../Images";
import { primarColor } from '../styles';
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  fbBtn: {
    position: "absolute",
    bottom: height / 4.7,
    right: width / 3.1
  }
});

class Login extends Component {
  onLogin = async () => {
    try {
      const {
        facebookData: { name, email, picture: { data: { url } } }
      } = await facebookLogin();
      this.props.dispatch(login({ name, url, email }));
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback style={{flex: 1, backgroundColor: primarColor}} onPress={this.onLogin}>
        <Image resizeMode="contain" style={styles.image} source={hulk} />
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(Login);
