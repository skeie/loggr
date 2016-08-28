import {View, Text, Modal} from 'react-native';
import React, { Component, PropTypes } from 'react';


class ModalWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {text: '', info:''};
    }

    static propTypes = {

    }

    onChangeText = (text) => {
        this.setState({
            text
        });
    }

    onExit = () => {
        onInfoChange(this.state.info);

    }

    render () {
        return (
            <Modal
              style={{backgroundColor: 'blue'}}
              animationType="slide"
              transparent
              visible={this.props.visible}
              onRequestClose={() => {}}>
                {this.props.children}
              </Modal>

        );
    }
}

export default ModalWrapper;
