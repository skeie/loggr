
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    StyleSheet
} from 'react-native';
import { create } from '../Images/index';
import { width, height } from '../utils/utils';
import TextInput from '../components/textInput'
import { headerColor, setColor, textColor } from '../styles';

const marginHorizontal = 28;
const textInputWidth = width - marginHorizontal * 4;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal,
        top: height / 3, // get keyboard height and determine this
        backgroundColor: 'white',
        height: 137, 
        borderRadius: 5
    },
    overlay: {
        flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
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
    }

})

const Create = ({showModal, onBlur, onClose, onChangeText}) => (
    <Modal
        visible={showModal}
        transparent
        animationType='fade'
        onRequestClose={onClose}>
        <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>New Workout</Text>
                    <TextInput
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                        placeholder='Name'
                        text=''
                        isActice
                        style={styles.textInput}
                        placeholderTextColor={setColor}
                        onSubmitEditing={onBlur}
                        autoFocus
                        />
                </View>
            </View>
        </View>
    </Modal>
);

export default Create;