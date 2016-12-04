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
    Image
} from 'react-native';
import {
    elementBox,
    setColor,
    exerciseName,
    underlineInActive,
    underlineActive,
    textColor
} from '../styles';
import TextInput from '../components/textInput';
const {width, height} = Dimensions.get('window');


class Elements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }


    onPress = (index = this.state.index) => {
        this.setState({
            index
        });
    }


    onBlur = (index) => {
        if (this.kg) {
            const elementId = this.props.element.getIn(['sets', index, 'id']);
            this.props.onSetChange(elementId, this.kg, index)
        }

    }

    onMetaDataChange = (metaData) => {
        this.props.onMetaDataChange(metaData, this.props.index)
    }

    onDelete = () => {
        this.props.onDelete(this.props.index, this.props.element.get('id'));
    }

    isActive = index => this.props.isActive && index === this.state.index


    render() {
        const {onMetaDataChange, onSetChange, element} = this.props;
        return (
            <View style={styles.container}>

                <Text style={styles.name}>
                    {element.get('name')}
                </Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    {element.get('sets').map((set, i) => (
                        <TextInput
                            text={set.get('amount')}
                            placeholder={set.get('amount')}
                            onPress={this.onPress}
                            index={i}
                            key={i}
                            onChangeText={kg => this.kg = kg}
                            onBlur={this.onBlur}
                            onSubmitEditing={this.onBlur}
                            isActice={this.isActive(i)}
                            style={styles.textInput}
                            autoFocus={false}
                            keyboardType='phone-pad' />
                    ))}

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        alignSelf: 'flex-start',
        marginTop: 20,
        fontSize: 18,
        color: exerciseName
    },
    textInput: {
        marginTop: 10,
        height: 50,
        width: width / 3,
        fontSize: 24,
        color: textColor
    },
    container: {
        paddingLeft: 16,
        backgroundColor: elementBox,
        height: 104,
        width,
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
