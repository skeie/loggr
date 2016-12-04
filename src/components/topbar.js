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
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { onChange } from '../search/searchActions';
import dismissKeyboard from 'dismissKeyboard';
import { primaryColor, placeholderColor, underlineActive, textColor } from '../styles'
import { search } from '../Images/index';

const {width} = Dimensions.get('window');

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  onChangeText = (text) => {
    this.props.dispatch(onChange(text));
  }

  onFocus = () => {
    this.setState({isActive: true});
  }

    toggleSearchPress = () => {
    this.setState(({isActive}) => ({
      isActive: !isActive
    }))
  }



  cancelPressed = () => {
    dismissKeyboard();
    this.toggleSearchPress();
    this.props.dispatch(onChange(''));

  }

  onIconPressed = () => {
    if (this.state.isActive) {
      this.cancelPressed();
    } else {
      this.toggleSearchPress();
    }
  }

  render() {
    const { isActive } = this.state;

    const backgroundColor = { backgroundColor: isActive ? 'white' : primaryColor }
    const underlineColor = isActive ? underlineActive : "transparent";
    const textColor = isActive ? textColor : placeholderColor;
    const placeholder = isActive ? "Search..." : "Traningsplan";

    return (
      <View style={[styles.container, backgroundColor]}>
        <View style={{ flex: 8, }}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={this.onChangeText}
            value={this.props.search.get('searchString')}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid={underlineColor}
            onFocus={this.onFocus}
            placeholderTextColor={textColor}
            />
        </View>
        <TouchableOpacity onPress={this.onIconPressed} activeOpacity={0}>
          {isActive ?
            <Text style={{fontSize: 25}}> X </Text>
            : <Image source={search} style={{ marginRight: 16 }} />
          }

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,

  },
  textInput: {
    height: 56,
    fontSize: 20
  }
});

export default connect(({ search }) => (
  {
    search
  }
))(Topbar);
