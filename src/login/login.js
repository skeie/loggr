import React, { Component } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { width } from "../utils/utils";
import { facebookLogin } from "./facebooklogin";
import { login } from "../user/userAction";
import { connect } from "react-redux";
import { hulk, loginBtn } from "../Images";

const styles = StyleSheet.create({
  image: {
    width,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  },
  fbBtn: {
    marginBottom: 175
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
      <Image style={styles.image} source={hulk}>
        <TouchableOpacity style={styles.fbBtn} onPress={this.onLogin}>
          <Image source={loginBtn} />
        </TouchableOpacity>
      </Image>
    );
  }
}

export default connect()(Login);
