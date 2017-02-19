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
  textColor,
  deepPurple,
  underlineInActive
} from "../styles";
import { search, addBtn, cancelBtn, searchHulk } from "../Images";
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

  ref = {}

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
          marginTop: 20,
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
          style={{ position: "absolute", bottom: 15, left: 25 }}
          source={search}
        />

      </View>
    );
  };

  

  renderJustIcons = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 65,
        marginTop: 20,
        backgroundColor: primaryColor,
        paddingHorizontal: 16
      }}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={this.toggleSearchPress}>
        <Image source={searchHulk} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "flex-end" }}
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
    top: 15,
    right: 5
  }
});

export default connect(({ search }) => ({
  search
}))(Topbar);
