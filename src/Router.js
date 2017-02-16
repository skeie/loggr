import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store, loadOfflineData } from "./store";
import Progressbar from "./components/progressbar";
require("./config/onRun");
import Topbar from "./components/topbar";
import Exercises from "./exercises";
import KeyboardHeightController from "./controllers/keyboardHeightController";
import Login from "./login/login";
import { connect } from "react-redux";
import { setAuthorizationToken } from "./utils/fetch";
import { background } from "./Images";
import SpinningImg from "./components/spinningImg";
const List = () => (
  <View style={{ flex: 1 }}>
    <Topbar />
    <Exercises />
    <KeyboardHeightController />
  </View>
);

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <SpinningImg />
  </View>
);

class Router extends Component {
  constructor(props) {
    super(props);
    // StatusBar.setHidden(true);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    if (this.props.jwtToken) {
      console.log('sapdap')
      setTimeout(
        () => {
          this.setState({ loaded: true });
        },
        3000
      );
    }
  }

  componentWillReceiveProps({ jwtToken }) {
    if (jwtToken && !this.props.jwtToken) {
      setAuthorizationToken(jwtToken);
    }
  }

  render() {
    return <Login />;
    if (this.props.jwtToken) {
      if (this.state.loaded) {
        return <List />;
      } else {
       return <Loading />;
      }
    } else {
      return <Login />;
    }
  }
}

export default connect(({ user }) => ({
  jwtToken: user.get("jwtToken")
}))(Router);
