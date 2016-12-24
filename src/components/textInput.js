import React, {Component} from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { width } from '../utils/utils';
import { setColor, underlineActive, underlineInActive } from '../styles';
const NO_OP = () => { };

class LoggrTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.value
        }
    }

    static defaultProps = {
        onChangeText: NO_OP
    }

    onChangeText = text => {
        this.setState({
            text
        });
        this.props.onChangeText(text);
    }

    render() {
        const {
            text,
            index,
            isActice,
            onPress = NO_OP,
            style,
            placeholder,
            placeholderTextColor,
            onBlur = NO_OP,
            autoFocus,
            onSubmitEditing,
            returnKeyType = 'done',
            keyboardType = 'default',
            onScroll = NO_OP,
            value
        } = this.props;
        return (
            <TextInput
                placeholder={placeholder}
                key={index}
                style={[Styles.textInput, style]}
                underlineColorAndroid={isActice ? underlineActive : underlineInActive}
                onFocus={onPress.bind(null, index)}
                placeholderTextColor={placeholderTextColor}
                onBlur={() => onBlur(index)}
                autoFocus={autoFocus}
                onSubmitEditing={() => onSubmitEditing(index)}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                onChangeText={this.onChangeText}
                value={this.state.text}
                >
            </TextInput>
        );
    }
}

const Styles = StyleSheet.create({
    textInput: {
        color: setColor
    }
});

export default LoggrTextInput;

