import React, { Component } from "react";
import Modal from "../components/modal";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView
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
import { bronse, silver, gold } from "../Images";
import { isAndroid } from "../utils/utils";
const { width, height } = Dimensions.get("window");

const elements = [bronse, silver, gold];
class Elements extends Component {
  constructor(props) {
    super(props);
    this.inputs = [];
  }

  onPress = (index = 0) => {
    if (this.props.element.get("sets").size > index) {
      // don't increment if we are at the last element in the sets array
      this.props.dispatch(textInputChange(this.props.id, index));
    }
  };

  // shouldComponentUpdate({currentIndex, element}) {
  //     return currentIndex.get('elementId') === this.props.id ||
  //         this.props.elementId === this.props.currentIndex.get('elementId') || this.props.element !== element;
  // }

  shouldSetAutoFocus = currentIndex =>
    currentIndex.get("elementId") === this.props.id &&
      currentIndex.get("setIndex") != this.props.currentIndex.get("setIndex");

  componentWillReceiveProps({ currentIndex }) {
    if (this.shouldSetAutoFocus(currentIndex)) {
      // this.inputs[currentIndex.get('setIndex')].focus();
    }
  }

  onBlur = index => {
    if (this.kg && this.props.currentIndex.get("elementId") === this.props.id) {
      const { element } = this.props;
      const elementId = element.getIn(["sets", index, "id"]);
      this.props.onSetChange(elementId, this.kg, index);

      // setTimeout(() => { this.onPress(index + 1); })
      this.setNextActive(index + 1);
      // setTimeout(() => { this.props.dispatch(onChange('')) })
    }
  };

  setNextActive = index => {
    if (this.props.element.get("sets").size > index) {
      this.inputs[index].focus();
    }
  };

  onMetaDataChange = metaData => {
    this.props.onMetaDataChange(metaData, this.props.elementId);
  };

  onDelete = () => {
    this.props.onDelete(this.props.elementId, this.props.element.get("id"));
  };

  isActive = index => {
    const { elementId, currentIndex } = this.props;
    return currentIndex.get("elementId") === elementId &&
      index === currentIndex.get("setIndex");
  };

  onLongPress = () => {
    this.props.dispatch(toggleModal(this.props.id));
  };

  getValue = set => {
    return set.get("amount") ? { value: set.get("amount") } : {};
  };

  onFocus = i => {
    if (this.props.element.getIn(["sets", i, "amount"]) === "0") {
      this.inputs[i].clear();
    }
    this.onPress(i);
  };

  render() {
    const { onMetaDataChange, onSetChange, element, currentIndex } = this.props;
    const fontSize = { fontSize: element.get("name").length >= 16 ? 26 : 38 };
    const androidWidth = isAndroid() && { width };
    return (
        <View>
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
            horizontal
            contentContainerStyle={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {element.get("sets").map((set, i) => (
              <View
                style={{
                  backgroundColor: deepPurple,
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginHorizontal: 10,
                  borderRadius: 13,
                  flex: 1
                }}
                key={this.props.element.getIn(["sets", i, "id"])}
              >
                <Text fontFamily="regular" style={styles.elementTitle}>
                  Set {i + 1}
                </Text>
                <Image source={elements[i]} />
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
                  style={[styles.textInput, androidWidth]}
                  isActice={this.isActive(i)}
                  {...this.getValue(set)}
                />
              </View>
            ))}
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
    fontFamily: "Fredoka One"
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
  currentIndex: element
}))(Elements);
