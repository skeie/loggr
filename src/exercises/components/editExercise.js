
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    StyleSheet
} from 'react-native';
import { marginHorizontal, textInputWidth } from './modal';
import { headerColor, setColor, textColor, errorColor, greyBackground } from '../../styles';
import TextInput from '../../components/textInput';
import { connect } from 'react-redux';
import { onDelete, onExerciseUpdate } from '../actions';
import { toggleModal } from '../../element/elementActions';

const newText = '';

const defaultText = (exercises, element) => {
    const elementIndex = element.get('elementIndex');
    const setIndex = element.get('setIndex');
    return exercises.getIn(['exercises', elementIndex, 'sets', setIndex, 'name']);
}

const onPress = (dispatch, exercises, element) => {

    const elementIndex = element.get('elementIndex');
    const id = exercises.getIn(['exercises', elementIndex, 'id']);

    dispatch(onDelete(id, elementIndex));
    closeModal(dispatch);
}

const onBlur = (exercises, element, dispatch) => {
    const elementIndex = element.get('elementIndex');
    const id = exercises.getIn(['exercises', elementIndex, 'id']);
    dispatch(onExerciseUpdate(id, { name: newText }, elementIndex));
    closeModal(dispatch);
}

const closeModal = (dispatch) => {
    setTimeout(() => {
        dispatch(toggleModal());
    });
}



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
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteBtnContainer: {
        justifyContent: 'center',
        backgroundColor: greyBackground,
        padding: 11
    },
    deleteBtn: {
        textAlign: 'center',
        color: errorColor,
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 14
    }
});

const EditExercise = ({
    onChangeText,
    exercises,
    element,
    dispatch
}) => {
    return (
        <View style={styles.innerContainer}>
            <View style={styles.buttonContainer}>
                <Text style={styles.title}>Edit</Text>
                <TouchableOpacity
                    onPress={() => { onPress(dispatch, exercises, element); } }
                    style={styles.deleteBtnContainer}>
                    <Text style={styles.deleteBtn}>DELETE</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                onChangeText={text => newText = text}
                onBlur={() => { onBlur(exercises, element, dispatch) } }
                placeholder='Name'
                value={defaultText(exercises, element)}
                isActice
                style={styles.textInput}
                placeholderTextColor={setColor}
                onSubmitEditing={() => { onBlur(exercises, element, dispatch) } }
                autoFocus
                />
        </View>
    );
}

export default connect(state => ({
    exercises: state.exercises,
    search: state.search,
    element: state.element
}))(EditExercise);