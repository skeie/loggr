import React, { Component } from "react";
import Modal from "../components/modal";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import {
  elementBox,
  setColor,
  exerciseName,
  underlineInActive,
  underlineActive,
  textColor,
  deepPurple
} from "../styles";
import TextInput from "../components/textInput";
import { connect } from "react-redux";
import { textInputChange, toggleModal } from "./elementActions";
import { more, addBtnBlack } from "../Images";
import { onChange } from "../search/searchActions";
import Text from "../components/text";
import { bronse, silver, gold, checked } from "../Images";
import { isAndroid } from "../utils/utils";
const { width, height } = Dimensions.get("window");
import dismissKeyboard from "dismissKeyboard";
import differenceBy from "lodash/differenceBy";
import { textStyle } from '../components/text';
const elements = [bronse, silver, gold];
class Elements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      differenceId: ""
    };
    this.inputs = [];
    this.viewRef = {};
  }

  onPress = (index = 0) => {
    if (this.props.element.get("sets").size > index) {
      // don't increment if we are at the last element in the sets array
      this.props.dispatch(textInputChange(this.props.id, index));
    }
  };

  //  shouldComponentUpdate({currentIndex}, {differenceId}) {
  //      return currentIndex !== this.props.currentIndex || this.props.differenceId !== differenceId
  //  }

  // shouldSetAutoFocus = currentIndex =>
  //   currentIndex.get("elementId") === this.props.id &&
  //     currentIndex.get("setIndex") != this.props.currentIndex.get("setIndex");

  componentWillReceiveProps({ element }) {
    // means that an element has been modified and saved in backend,
    // show feedback
    if (element !== this.props.element) {
      const that = this;
      const difference = differenceBy(
        element.get("sets").toJS(),
        this.props.element.get("sets").toJS(),
        "amount"
      )[0];
      if (Boolean(difference)) {
        debugger;

        this.timeout = this.setState(
          { differenceId: difference.id },
          this.onSaveSuccess
        );
      }
      // const changed = differenceBy(element, this.props.element)
    }
    // if (this.shouldSetAutoFocus(currentIndex)) {
    // this.inputs[currentIndex.get('setIndex')].focus();
    // }
  }

  onSaveSuccess = () => {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = setTimeout(
      () => {
        this.setState({
          differenceId: ""
        });
      },
      2000
    );
  };

  onBlur = index => {
    if (this.kg && this.props.currentIndex.get("elementId") === this.props.id) {
      const { element } = this.props;
      const elementId = element.getIn(["sets", index, "id"]);
      this.props.onSetChange(elementId, this.kg, index);

      // setTimeout(() => { this.onPress(index + 1); })
      this.setNextActive(index + 1);
      // setTimeout(() => { this.props.dispatch(onChange('')) })
      dismissKeyboard();
    }
  };

  setNextActive = index => {
    if (this.props.element.get("sets").size > index) {
      // not a brand new exercise, try not to autocomplete
      if (this.inputs[index].props.value !== "0") {
        this.kg = "";
      }

      this.inputs[index].focus();
    }
  };

  onDelete = () => {
    this.props.onDelete(this.props.elementId, this.props.element.get("id"));
  };

  onLongPress = () => {
    this.props.dispatch(toggleModal(this.props.id));
  };

  getValue = set => {
    return set.get("amount") ? { value: set.get("amount") } : {};
  };

  onFocus = i => {
    !isAndroid() &&  this.props.scrollTo(this.y - 180);
    if (this.props.element.getIn(["sets", i, "amount"]) === "0") {
      this.inputs[i].clear();
    }
    this.onPress(i);
  };

  onLayout = event => {
    this.y = event.nativeEvent.layout.y;
  };

  render() {
    const { onSetChange, element, currentIndex, getScrollTo } = this.props;
    const fontSize = { fontSize: element.get("name").length >= 16 ? 26 : 38 };
    const androidWidth = isAndroid() && { width };

    return (
      <View onLayout={this.onLayout}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
            justifyContent: "space-between"
          }}
        >
          <Text style={[styles.name, fontSize]}>
            {element.get("name")}
          </Text>
          <Text onPress={this.onLongPress} style={styles.editbtn}>
            EDIT
          </Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          horizontal
          contentContainerStyle={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {element.get("sets").map((set, i) => {
            return (
              <View
                style={{
                  backgroundColor: deepPurple,
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginHorizontal: 10,
                  borderRadius: 13,
                  flex: 1,
                  height: 180
                }}
                key={set.get("id")}
              >
                <Text fontFamily="regular" style={styles.elementTitle}>
                  Set {i + 1}
                </Text>
                <Image
                  source={
                    set.get("id") === this.state.differenceId
                      ? checked
                      : elements[i]
                  }
                />
                <TextInput
                  onFocus={() => this.onFocus(i)}
                  setRef={ref => this.inputs[i] = ref}
                  placeholder={set.get("amount")}
                  onPress={this.onPress}
                  index={i}
                  key={i}
                  onChangeText={kg => this.kg = kg}
                  onBlur={this.onBlur}
                  onSubmitEditing={this.onBlur}
                  keyboardType="phone-pad"
                  style={[styles.textInput, androidWidth, textStyle.regular]}
                  returnKeyType="google"
                  {...this.getValue(set)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: "flex-start",
    fontSize: 35,
    color: exerciseName,
    marginLeft: 16
  },
  textInput: {
    height: 50,
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontFamily: "FredokaOne_Regular"
  },
  elementTitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF"
  },
  editbtn: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10
  }
});

export default connect(({ element }) => ({
  currentIndex: element,
}))(Elements);
