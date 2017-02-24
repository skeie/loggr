/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
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
  textColor,
  deepPurple,
  underlineInActive
} from "../styles";
import { search, addBtn, cancelBtn, searchHulk } from "../Images";
import { toggleCreateModal } from "../exercises/actions";
import { INIT_STATE } from "../element/elementActions";
import { isAndroid } from "../utils/utils";
import Text from "../components/text";

const { width } = Dimensions.get("window");

const HideKeyboard = ({ controll }) => {
  return controll.get("keyboardHeight")
    ? <TouchableOpacity style={styles.hideKeyboard} onPress={dismissKeyboard}>
        <Text>
          Done
        </Text>
      </TouchableOpacity>
    : <View />;
};

class Topbar extends Component {
  constructor(props) {
    super(props);
    // StatusBar.setHidden(false);

    this.state = {
      isActive: false
    };
  }

  ref = {};

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

  renderTextInput = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          height: 65,
          marginTop: isAndroid() ? 10 : 20,
          backgroundColor: primaryColor
        }}
      >

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
          onPress={this.toggleSearchPress}
        >
          <TextInput
            style={styles.textInput}
            onChangeText={this.onChangeText}
            value={this.props.search.get("searchString")}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid="transparent"
            onFocus={this.onFocus}
            placeholder="Search"
            placeholderTextColor="#5E3E5E"
            autoFocus
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.cancelPressed}
          activeOpacity={0}
          style={styles.iconContainer}
        >
          <Image source={cancelBtn} />
        </TouchableOpacity>
        <Image
          style={{ position: "absolute", top: 15, left: 25 }}
          source={search}
        />

      </View>
    );
  };

  renderJustIcons = () => (
    <View
      style={{
        backgroundColor: primaryColor,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        width,
        height: 65,
        marginTop: isAndroid() ? 10 : 20
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 10,
          top: 0,
          bottom: 0,
          alignItems: "center"
        }}
        onPress={this.toggleSearchPress}
      >
        <Image source={searchHulk} />
      </TouchableOpacity>
      <HideKeyboard controll={this.props.controll} />
      <TouchableOpacity
        style={{
          position: "absolute",
          alignItems: "center",
          right: 10,
          top: 0,
          bottom: 0
        }}
        onPress={this.onIconPressed}
      >
        <Image source={addBtn} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { isActive } = this.state;
    return isActive ? this.renderTextInput() : this.renderJustIcons();
  }
}

const styles = StyleSheet.create({
  hideKeyboard: {
    backgroundColor: "#6DCF00",
    borderRadius: 200,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    justifyContent: "space-around",
    paddingHorizontal: 16,
    backgroundColor: primaryColor,
    marginTop: 15
  },
  textInput: {
    height: 56,
    fontSize: 20,
    color: "white",
    backgroundColor: deepPurple,
    borderRadius: 25,
    width: width - 35,
    paddingLeft: 50,
    fontFamily: "FredokaOne-Regular"
  },
  iconContainer: {
    width: 50,
    height: 100,
    position: "absolute",
    top: 20,
    right: 15
  }
});

export default connect(({ search, controll }) => ({
  search,
  controll
}))(Topbar);
