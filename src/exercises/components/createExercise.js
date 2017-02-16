import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { headerColor, setColor, textColor } from "../../styles";
import { marginHorizontal, textInputWidth } from "./modal";
import TextInput from "../../components/textInput";

const styles = StyleSheet.create({
  innerContainer: {
    padding: marginHorizontal,
    backgroundColor: "#599418"
  },
  title: {
    fontSize: 20,
    color: headerColor
  },
  textInput: {
    width: textInputWidth,
    color: textColor,
    fontSize: 26,
    flex: 1,
    fontFamily: "FredokaOne-Regular",
    alignSelf: "flex-start",
    marginLeft: 5
  }
});

const CreateExercise = (
  {
    onBlur,
    onChangeText
  }
) => (
  <TextInput
    multiline
    onChangeText={onChangeText}
    placeholder="Title"
    text=""
    isActice
    style={styles.textInput}
    placeholderTextColor={setColor}
    onSubmitEditing={onBlur}
    autoFocus
  />
);

export default CreateExercise;
