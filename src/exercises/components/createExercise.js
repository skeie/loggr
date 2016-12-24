import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { headerColor, setColor, textColor } from '../../styles';
import { marginHorizontal, textInputWidth } from './modal';
import TextInput from '../../components/textInput';

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
    }
});

const CreateExercise = ({
    onBlur,
    onChangeText
}) => (
        <View style={styles.innerContainer}>
            <Text style={styles.title}>New Workout</Text>
            <TextInput
                onChangeText={onChangeText}
                placeholder='Name'
                text=''
                isActice
                style={styles.textInput}
                placeholderTextColor={setColor}
                onSubmitEditing={onBlur}
                autoFocus
                />
        </View>
    );

export default CreateExercise;