/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { onChange } from "../search/searchActions";
import dismissKeyboard from "dismissKeyboard";
import {
  primaryColor,
  placeholderColor,
  underlineActive,
  textColor
} from "../styles";
import { search, addBtn, cancelBtn } from "../Images";
import { toggleCreateModal } from "../exercises/actions";
import { INIT_STATE } from "../element/elementActions";
import { isAndroid } from "../utils/utils";

const { width } = Dimensions.get("window");

class Topbar extends Component {
  constructor(props) {
    super(props);
    // StatusBar.setHidden(false);

    this.state = {
      isActive: false
    };
  }

  onChangeText = text => {
    this.props.dispatch(onChange(text));
  };

  onFocus = () => {
    this.setState({ isActive: true });
  };

  toggleSearchPress = () => {
    //this.props.dispatch(INIT_STATE())
    this.setState(({ isActive }) => ({
      isActive: !isActive
    }));
  };

  cancelPressed = () => {
    dismissKeyboard();
    this.toggleSearchPress();
    this.props.dispatch(onChange(""));
  };

  onIconPressed = () => {
    if (this.state.isActive) {
      this.cancelPressed();
    } else {
      this.props.dispatch(toggleCreateModal());
    }
  };

  render() {
    const { isActive } = this.state;

    const underlineColor = isActive ? underlineActive : "transparent";
    const textColor = isActive ? textColor : placeholderColor;
    const imgSrc = isActive ? cancelBtn : addBtn;
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={{flexDirection: "row", alignItems: 'center', flex: 1 }}
          onPress={this.toggleSearchPress}
        >
          <Image source={search} />
          <TextInput
            style={styles.textInput}
            onChangeText={this.onChangeText}
            value={this.props.search.get("searchString")}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid={underlineColor}
            onFocus={this.onFocus}
            placeholderTextColor={textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onIconPressed}
          activeOpacity={0}
          style={styles.iconContainer}
        >
          <Image source={imgSrc} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    backgroundColor: primaryColor,
    marginTop: 10
  },
  textInput: {
    height: 56,
    fontSize: 20,
    flex: 7,
    color: 'white',
    marginLeft: 10
  },
  iconContainer: {
    width: 50,
    height: 100,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default connect(({ search }) => ({
  search
}))(Topbar);
