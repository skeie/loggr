import React, { Component } from "react";
import { View, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { create } from "../../Images/index";
import { width, height } from "../../utils/utils";
import { headerColor, setColor, textColor } from "../../styles";
import { isAndroid } from "../../utils/utils";
import { connect } from "react-redux";
import Text from "../../components/text";
import { modalImg, deleteImg } from "../../Images";
import { onDelete, onExerciseUpdate } from "../actions";
import { toggleModal } from "../../element/elementActions";
export const marginHorizontal = 28;
export const textInputWidth = width - marginHorizontal * 4;

const modalHeight = 200;
const suggestedKeyboardWordHeigth = isAndroid() ? 100 : 100;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal,
    backgroundColor: "#599418",
    height: 200,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 10,
    borderColor: "#A0FF38"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  xBtn: {
    fontSize: 20,
    color: "white",
    textAlign: "right",
    margin: isAndroid() ? 15 : 30,
    alignSelf: "flex-end"
  },
  title: {
    fontSize: 34,
    color: "#FFFFFF",
    marginBottom: 10
  }
});

 const getSelectedExercise = (element, exercises) => (
    exercises.get('exercises').find(arrayElement => {
        if (arrayElement.get('id') === element.get('elementId')) {
            return arrayElement;
        }
    })
);

class LoggerModal extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate({ showModal, controll }) {
    return this.props.showModal != showModal ||
      controll.get("keyboardHeight") !=
        this.props.controll.get("keyboardHeight");
  }
  

  renderNewWorkout = header => <Text style={styles.title}>{header}</Text>;

  onPressDelete = () => {
    const { element, exercises, dispatch } = this.props;
    const elementIndex = element.get("elementIndex");
    const id = getSelectedExercise(element, exercises).get("id");

    dispatch(onDelete(id, elementIndex));
    setTimeout(() => {
      dispatch(toggleModal());
    });
  };

  renderEditHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 50
      }}
    >
      <Text style={styles.title}>Edit</Text>
      <TouchableOpacity onPress={this.onPressDelete}>
        <Image source={deleteImg} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {
      showModal,
      onClose,
      children,
      controll,
      onBlur,
      header,
      isEdit = false
    } = this.props;

    const top = {
      marginTop: (
        controll.get("keyboardHeight") -
          modalHeight -
          suggestedKeyboardWordHeigth
      )
    };

    return (
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={[styles.overlay]}>
          <Text style={styles.xBtn} onPress={onClose}>X</Text>
          {isEdit ? this.renderEditHeader() : this.renderNewWorkout(header)}
          <View style={[styles.container]}>
            {children}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: width / 3.1,
                bottom: -30
              }}
              onPress={onBlur}
            >
              <Image source={modalImg} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default connect(({ controll, exercises, element }) => ({
  controll,
  exercises,
  element
}))(LoggerModal);
