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
import { primaryColor } from "./styles";
import Keyboard from './components/keyboard/keyboard';
const List = () => (
  <View style={{ flex: 1, backgroundColor: primaryColor }}>
    <Topbar />
    <Exercises />
    <Keyboard />
  </View>
);

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    if (this.props.jwtToken) {
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
    if (this.props.jwtToken) {
      return <List />;
    } else {
      return <Login />;
    }
  }
}

export default connect(({ user }) => ({
  jwtToken: user.get("jwtToken")
}))(Router);
