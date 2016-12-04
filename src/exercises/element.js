/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Modal from '../components/modal';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    TextInput,
    Image
} from 'react-native';
const {width, height} = Dimensions.get('window');


class Elements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            index: 0
        }
    }


    onPress = (index = this.state.index) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            index
        });
    }


    onKgChange = (kg) => {
        this.props.onSetChange(this.state.index, kg, this.props.index);
    }


    element = ({ text = '-', onPress = () => { }, index }) => <Text onPress={() => { onPress(index) } } style={styles.elementContainer}>{text}</Text>

    modalContent = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{this.props.element.get('name') } set #{this.state.index + 1}</Text>
                <Text onPress={this.onPress} style={{ color: 'black', fontSize: 18 }}>Save</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={{ height: 40, width }}
                    onChangeText={this.onKgChange}
                    value={this.props.element.getIn(['sets', this.state.index]) }
                    autoFocus
                    />
            </View>
            <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={styles.textBox}
                    editable
                    multiline
                    maxLength={400}
                    value={this.props.element.get('metaData') }
                    onChangeText={this.onMetaDataChange}
                    />
            </View>
        </View>
    )

    onMetaDataChange = (metaData) => {
        this.props.onMetaDataChange(metaData, this.props.index)
    }

    onDelete = () => {
        this.props.onDelete(this.props.index, this.props.element.get('id'));
    }
    render() {
        const {onMetaDataChange, onSetChange, element} = this.props;
        return (
            <View style={styles.container}>
                {this.element({ text: element.get('name') }) }
                {this.element({ text: element.getIn(['sets', 0]), onPress: this.onPress, index: 0 }) }
                {this.element({ text: element.getIn(['sets', 1]), onPress: this.onPress, index: 1 }) }
                {this.element({ text: element.getIn(['sets', 2]), onPress: this.onPress, index: 2 }) }
                <TouchableHighlight onPress={this.onDelete}>
                    <Image source={require('./imgs/garbage.png') } style={{ height: 45, width: 45 }}/>
                </TouchableHighlight>
                <Modal visible={this.state.modalOpen}>
                    {this.modalContent() }
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: 60,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    elementContainer: {
        flex: 1
    },
    textBox: {
        width,
        marginTop: 10,
        marginBottom: 14,
        borderRadius: 2,
        textAlignVertical: 'top',
        flex: 1
    },

});

export default Elements;
