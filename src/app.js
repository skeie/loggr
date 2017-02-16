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
import Router from './Router';

export default class App extends Component {
  constructor(props) {
    super(props);
    // StatusBar.setHidden(true);
    this.state = {
      loaded: false
    };
  }

  shouldComponentUpdate(nextProps, { loaded }) {
    return loaded;
  }

  componentDidMount() {
    loadOfflineData().finally(() => {
      this.setState({
        loaded: true
      });
    });
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}
