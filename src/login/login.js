import React, { Component } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { width, height } from "../utils/utils";
import { facebookLogin } from "./facebooklogin";
import { login } from "../user/userAction";
import { connect } from "react-redux";
import { hulk, loginBtn } from "../Images";

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
      <Image resizeMode="contain" style={styles.image} source={hulk}>
        <TouchableOpacity style={styles.fbBtn} onPress={this.onLogin}>
          <Image source={loginBtn} />
        </TouchableOpacity>
      </Image>
    );
  }
}

export default connect()(Login);
