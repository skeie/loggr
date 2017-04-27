import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet,
    TextInput
} from 'react-native';
import { create } from '../../Images/index';
import { width, height } from '../../utils/utils';
import { headerColor, setColor, textColor } from '../../styles';
import { isAndroid } from '../../utils/utils';
import { connect } from 'react-redux';
import Text from '../../components/text';
import { modalImg, deleteImg, overlay } from '../../Images';
import { onDelete, onExerciseUpdate } from '../actions';
import { toggleModal } from '../../element/elementActions';
export const marginHorizontal = 28;
export const textInputWidth = width - marginHorizontal * 4;
import { white, hulkGreen, borderGreen } from '../../styles';
const modalHeight = 200;
const suggestedKeyboardWordHeigth = isAndroid() ? 0 : 100;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal,
        backgroundColor: hulkGreen,
        height: 200,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 10,
        borderColor: borderGreen,
        marginBottom: 50,
        paddingBottom: 50
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    xBtn: {
        fontSize: 20,
        color: white,
        textAlign: 'right',
        margin: isAndroid() ? 15 : 30,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 34,
        color: white,
        marginBottom: 10,
        textAlign: 'center'
    },
    doneIcon: {
        position: 'absolute',
        bottom: isAndroid() ? -5 : -20,
        left: width / 3.1
    },
    imageContainer: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: 'stretch'
    },
    editContainer: {
        flexDirection: 'row',
        width: width - 30,
        justifyContent: 'space-between',
        paddingLeft: 30,
        alignItems: 'center'
    }
});

const getSelectedExercise = (element, exercises) =>
    exercises.get('exercises').find(arrayElement => {
        if (arrayElement.get('id') === element.get('elementId')) {
            return arrayElement;
        }
    });

class LoggerModal extends Component {
    state = {
        text: '1'
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({ showModal, controll }) {
        return this.props.showModal != showModal ||
            controll.get('keyboardHeight') !=
                this.props.controll.get('keyboardHeight');
    }

    renderNewWorkout = header => <Text style={styles.title}>{header}</Text>;

    onPressDelete = () => {
        const { element, exercises, dispatch } = this.props;
        const elementIndex = element.get('elementIndex');
        const id = getSelectedExercise(element, exercises).get('id');

        dispatch(onDelete(id, elementIndex));
        setTimeout(() => {
            dispatch(toggleModal());
        });
    };

    renderEditHeader = () => (
        <View style={styles.editContainer}>
            <Text style={styles.title}>Edit</Text>
            <TouchableOpacity onPress={this.onPressDelete}>
                <Image source={deleteImg} />
            </TouchableOpacity>
        </View>
    );

    onAdd = () => {
        if (this.props.isEdit) {
            this.props.onBlur();
        } else {
            this.props.onBlur(this.state.text);
        }
    };

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
                controll.get('keyboardHeight') -
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
                <Image style={styles.imageContainer} source={overlay}>
                    <Text style={styles.xBtn} onPress={onClose}>X</Text>
                    {!isEdit &&
                        <View style={{ alignItems: 'center' }}>
                            <TextInput
                                value={this.state.text}
                                onChangeText={text => this.setState({ text })}
                                style={{
                                    width: 75,
                                    height: 40,
                                    alignSelf: 'center',
                                    color: 'white',
                                    backgroundColor: hulkGreen
                                }}
                                underlineColorAndroid="transparent"
                            />
                        </View>}
                    {isEdit
                        ? this.renderEditHeader()
                        : this.renderNewWorkout(header)}
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.doneIcon}
                            onPress={this.onAdd}
                        >
                            <Image source={modalImg} />
                        </TouchableOpacity>
                        {children}
                    </View>
                </Image>
            </Modal>
        );
    }
}

export default connect(({ controll, exercises, element }) => ({
    controll,
    exercises,
    element
}))(LoggerModal);
