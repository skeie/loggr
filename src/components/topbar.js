/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {onChange} from '../search/searchActions';
import dismissKeyboard from 'dismissKeyboard';
import { primaryColor, placeholderColor } from '../styles'
import { search } from '../Images/index';
const {width} = Dimensions.get('window');
class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  onChangeText = (text) => {
    this.props.dispatch(onChange(text));
  }

  cancelPressed = () => {
    this.props.dispatch(onChange(''));
    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 8,  }}>
          <TextInput
            style={{ height: 40, color: placeholderColor, marginLeft: 16, fontSize: 20 }}
            onChangeText={this.onChangeText}
            value={this.props.search.get('searchString') }
            placeholder="Traningsplan"
            placeholderTextColor={placeholderColor}
            />
        </View>
        <Image source={search} style={{marginRight: 16}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    marginTop: 25,
    flexDirection: 'row',
    borderColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: primaryColor,
    alignItems: 'center'
  }
});

export default connect(({ search }) => (
  {
    search
  }
))(Topbar);
