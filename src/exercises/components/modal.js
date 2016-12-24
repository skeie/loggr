import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    StyleSheet
} from 'react-native';
import { create } from '../../Images/index';
import { width, height } from '../../utils/utils';
import { headerColor, setColor, textColor } from '../../styles';
import { isAndroid } from '../../utils/utils';
import { connect } from 'react-redux';

export const marginHorizontal = 28;
export const textInputWidth = width - marginHorizontal * 4;


const modalHeight = 200;
const suggestedKeyboardWordHeigth = isAndroid() ? 100 : 0;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal,
        backgroundColor: 'white',
        height: modalHeight,
        borderRadius: 5
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    xBtn: {
        fontSize: 20,
        color: 'white',
        textAlign: 'right',
        margin: 15
    }
});

class LoggerModal extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({showModal, controll}) {
        return this.props.showModal != showModal ||
            controll.get('keyboardHeight') != this.props.controll.get('keyboardHeight');
    }


    render() {
        const {
            showModal,
            onClose,
            children,
            controll
        } = this.props;

        const top = {
            marginTop: controll.get('keyboardHeight') - modalHeight - suggestedKeyboardWordHeigth
        };
        return (
            <Modal
                visible={showModal}
                transparent
                animationType='fade'
                onRequestClose={onClose}>
                <View style={styles.overlay}>
                    <Text style={styles.xBtn} onPress={onClose}>X</Text>
                    <View style={[styles.container, top]}>
                        {children}
                    </View>
                </View>
            </Modal>
        );
    }
}

export default connect(({controll}) => ({
    controll
}))(LoggerModal);