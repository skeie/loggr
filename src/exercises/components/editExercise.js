import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  StyleSheet
} from "react-native";
import { marginHorizontal, textInputWidth } from "./modal";
import {
  headerColor,
  setColor,
  textColor,
  errorColor,
  greyBackground
} from "../../styles";
import TextInput from "../../components/textInput";
import { connect } from "react-redux";
import { onDelete, onExerciseUpdate } from "../actions";
import { toggleModal } from "../../element/elementActions";

const newText = "";

const getSelectedExercise = (element, exercises) =>
  exercises.get("exercises").find(arrayElement => {
    if (arrayElement.get("id") === element.get("elementId")) {
      return arrayElement;
    }
  });

const defaultText = (exercises, element) => {
  const setIndex = element.get("setIndex");
  const elmt = getSelectedExercise(element, exercises);
  return elmt && elmt.getIn(["sets", setIndex, "name"]);
};

const onBlur = (exercises, element, dispatch) => {
  const elementIndex = element.get("elementIndex");
  const id = getSelectedExercise(element, exercises).get("id");
  dispatch(onExerciseUpdate(id, { name: newText }, elementIndex));
  closeModal(dispatch);
};

const closeModal = dispatch => {
  setTimeout(() => {
    dispatch(toggleModal());
  });
};

const styles = StyleSheet.create({
  innerContainer: {
    padding: marginHorizontal
  },
  title: {
    fontSize: 20,
    color: headerColor
  },
  textInput: {
    width: textInputWidth,
    color: textColor,
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
        fontFamily: "FredokaOne-Regular",

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtnContainer: {
    justifyContent: "center",
    backgroundColor: greyBackground,
    padding: 11
  },
  deleteBtn: {
    textAlign: "center",
    color: errorColor,
    fontSize: 16
  }
});

const EditExercise = (
  {
    onChangeText,
    exercises,
    element,
    dispatch
  }
) => {
  return (
    <TextInput
      multiline
      onChangeText={text => newText = text}
      onBlur={() => {
        onBlur(exercises, element, dispatch);
      }}
      placeholder="Name"
      value={defaultText(exercises, element)}
      isActice
      style={styles.textInput}
      placeholderTextColor={setColor}
      onSubmitEditing={() => {
        onBlur(exercises, element, dispatch);
      }}
      autoFocus
    />
  );
};

export default connect(state => ({
  exercises: state.exercises,
  search: state.search,
  element: state.element
}))(EditExercise);
