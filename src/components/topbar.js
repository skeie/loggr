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
import { search, addBtn, cancelBtn } from '../Images';
import { toggleCreateModal } from '../exercises/actions';
import { INIT_STATE } from '../element/elementActions';

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
    this.setState({ isActive: true });
  }

  toggleSearchPress = () => {
    this.props.dispatch(INIT_STATE())
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
      this.props.dispatch(toggleCreateModal());
    }
  }

  render() {
    const { isActive } = this.state;

    const backgroundColor = { backgroundColor: isActive ? 'white' : primaryColor }
    const underlineColor = isActive ? underlineActive : "transparent";
    const textColor = isActive ? textColor : placeholderColor;
    const imgSrc = isActive ? cancelBtn : addBtn;
    return (
      <View style={[styles.container, backgroundColor]}>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={this.toggleSearchPress}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onChangeText}
            value={this.props.search.get('searchString')}
            placeholder="Search"
            placeholderTextColor={placeholderColor}
            underlineColorAndroid={underlineColor}
            onFocus={this.onFocus}
            placeholderTextColor={textColor}
            />
          <View style={{position: 'absolute', top: 21, left: 75 }}>
            <Image source={search} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onIconPressed}
          activeOpacity={0}
          style={styles.iconContainer}>
          <Image source={imgSrc} />
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
    fontSize: 20,
    flex: 7
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(({ search }) => (
  {
    search
  }
))(Topbar);
