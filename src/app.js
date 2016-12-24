import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { store, loadOfflineData } from './store';
import Progressbar from './components/progressbar';
require('./config/onRun');
import Topbar from './components/topbar';
import Exercises from './exercises';
import KeyboardHeightController from './controllers/keyboardHeightController';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Topbar />
          <Exercises />
          <KeyboardHeightController />
        </View>
      </Provider>
    );
  }
}
