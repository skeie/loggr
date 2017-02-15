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

    componentWillReceiveProps(nextProps) {
        if(this.state.text != nextProps.value) {
            this.setState({
                text: nextProps.value
            });
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
            index,
            isActice,
            onPress = NO_OP,
            style,
            placeholder,
            placeholderTextColor,
            onBlur = NO_OP,
            autoFocus,
            onSubmitEditing = NO_OP,
            returnKeyType = 'done',
            keyboardType = 'default',
            onScroll = NO_OP,
            value,
            setRef = NO_OP,
            onFocus = NO_OP
        } = this.props;
        console.log(onFocus)
        return (
            <TextInput
                ref={setRef}
                onFocus={onFocus}
                placeholder={placeholder}
                key={index}
                style={[Styles.textInput, style]}
                underlineColorAndroid={isActice ? underlineActive : underlineInActive}
                placeholderTextColor={placeholderTextColor}
                onBlur={() => onBlur(index)}
                autoFocus={autoFocus}
                onSubmitEditing={() => onSubmitEditing(index)}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                onChangeText={this.onChangeText}
                value={this.state.text}
                />
        );
    }
}

const Styles = StyleSheet.create({
    textInput: {
        color: setColor
    }
});

export default LoggrTextInput;

