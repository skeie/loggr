import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store, loadOfflineData } from './store';
import Progressbar from './components/progressbar';
require('./config/onRun');
import Topbar from './components/topbar';
import Exercises from './exercises';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: null
    };

    loadOfflineData()
    .finally(() => {
      this.setState({ loaded: true });
    });
  }


  render() {
    if (this.state.loaded) {
      return (
        <Provider store={store}>
        <View style={{flex: 1}}>
          <Topbar />
          <Exercises />
         </View>
        </Provider>
      );
    } else {
      return <Progressbar />;
    }
  }
}
