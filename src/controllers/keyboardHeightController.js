import React from 'react';
import { View, DeviceEventEmitter, Dimensions, Keyboard, Platform } from 'react-native';
import { keyboardHeightChange } from './controllerActions';
import { connect } from 'react-redux';

class KeyboardController extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            //Keyboard.addListener(resetListener, this.resetKeyboardSpace)
        ];
        // DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    updateKeyboardSpace = (e) => {
        console.log('yolo 1337');
        const newSize = Dimensions.get('window').height - e.endCoordinates.height;
        console.log(newSize, this.newSize, '1340');
        if (this.newSize != newSize) {
            this.newSize = newSize;
            this.props.dispatch(keyboardHeightChange(newSize));
        }

    }

    // keyboardWillHide(e) {
    //     this.setState({ visibleHeight: Dimensions.get('window').height })
    // }

    render() {
        return null;
    }
}

export default connect()(KeyboardController);