import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { width } from '../utils/utils';
import { setColor, underlineActive, underlineInActive } from '../styles';
const NO_OP = () => { };

const myTextInput = ({
    text,
    index,
    isActice,
    onPress = NO_OP,
    style,
    placeholder,
    placeholderTextColor,
    onBlur,
    autoFocus,
    onSubmitEditing,
    returnKeyType = 'done',
    keyboardType = 'default',
    onChangeText  = NO_OP
}) => (
        <TextInput
            placeholder={placeholder}
            key={index}
            style={[Styles.textInput, style]}
            underlineColorAndroid={isActice ? underlineActive : underlineInActive}
            onFocus={onPress.bind(null, index)}
            placeholderTextColor={placeholderTextColor}
            onBlur={() => onBlur(index)}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType} 
            keyboardType={keyboardType}
            onChangeText={onChangeText }
            >
        </TextInput>
    );

const Styles = StyleSheet.create({
    textInput: {
        color: setColor
    }
})

export default myTextInput;

