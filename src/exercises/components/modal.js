import React from 'react';
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

export const marginHorizontal = 28;
export const textInputWidth = width - marginHorizontal * 4;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal,
        top: height / 3.5, // get keyboard height and determine this
        backgroundColor: 'white',
        height: 200,
        borderRadius: 5
    },
    overlay: {
        flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
});

const LoggrModal = ({
    showModal,
    onBlur,
    onClose,
    onChangeText,
    children
}) => (
        <Modal
            visible={showModal}
            transparent
            animationType='fade'
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Text onPress={onClose}>X</Text>
                <View style={styles.container}>
                    {children}
                </View>
            </View>
        </Modal>
    );

export default LoggrModal;