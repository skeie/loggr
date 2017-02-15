import React, { Component } from "react";
import Modal from "../components/modal";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from "react-native";
import {
  elementBox,
  setColor,
  exerciseName,
  underlineInActive,
  underlineActive,
  textColor
} from "../styles";
import TextInput from "../components/textInput";
import { connect } from "react-redux";
import { textInputChange, toggleModal } from "./elementActions";
import { more, addBtnBlack } from "../Images";
import { onChange } from "../search/searchActions";
const { width, height } = Dimensions.get("window");

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
      console.log('hva er amount ', this.props.element.getIn(["sets", i, "amount"]));
      
    if (this.props.element.getIn(["sets", i, "amount"]) === "0") {
        this.inputs[i].clear();
    } 
    this.onPress(i);

  };

  render() {
    const { onMetaDataChange, onSetChange, element, currentIndex } = this.props;
    return (
      <TouchableWithoutFeedback onLongPress={this.onLongPress}>
        <View style={styles.container}>
          <Text style={styles.name}>
            {element.get("name")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            {element
              .get("sets")
              .map((set, i) => (
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
                  style={styles.textInput}
                  isActice={this.isActive(i)}
                  {...this.getValue(set)}
                />
              ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: "flex-start",
    marginTop: 20,
    fontSize: 18,
    color: exerciseName
  },
  textInput: {
    marginTop: 10,
    height: 50,
    width: width / 3,
    fontSize: 24,
    color: textColor
  },
  container: {
    paddingLeft: 16,
    backgroundColor: elementBox,
    height: 104,
    width
  },
  elementContainer: {
    flex: 1
  },
  textBox: {
    width,
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 2,
    textAlignVertical: "top",
    flex: 1
  }
});

export default connect(({ element }) => ({
  currentIndex: element
}))(Elements);
