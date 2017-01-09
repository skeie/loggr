import React, { Component } from 'react';
import Modal from '../components/modal';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    ScrollView
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
import { connect } from 'react-redux';
import { textInputChange, toggleModal } from './elementActions';
import { more, addBtnBlack } from '../Images';
const {width, height} = Dimensions.get('window');

class Elements extends Component {
    constructor(props) {
        super(props);
        this.inputs = [];
    }

    onPress = (index = 0) => {
        if (this.props.element.get('sets').size > index) {
            // don't increment if we are at the last element in the sets array
            this.props.dispatch(textInputChange(this.props.elementIndex, index));
        }
    }

    shouldComponentUpdate({currentIndex, element}) {
        return currentIndex.get('elementIndex') === this.props.elementIndex ||
            this.props.elementIndex === this.props.currentIndex.get('elementIndex') || this.props.element !== element;
    }

    shouldSetAutoFocus = currentIndex => (
        currentIndex.get('elementIndex') === this.props.elementIndex &&
        currentIndex.get('setIndex') != this.props.currentIndex.get('setIndex')
    )

    componentWillReceiveProps({currentIndex}) {
        if (this.shouldSetAutoFocus(currentIndex)) {
            this.inputs[currentIndex.get('setIndex')].focus();
        }

    }



    onBlur = (index) => {
        if (this.kg) {
            const { element } = this.props;
            const elementId = element.getIn(['sets', index, 'id']);
            this.props.onSetChange(elementId, this.kg, index);
            //setTimeout(() => { this.onPress(index + 1); })

        }

    }

    onMetaDataChange = (metaData) => {
        this.props.onMetaDataChange(metaData, this.props.elementIndex)
    }

    onDelete = () => {
        this.props.onDelete(this.props.elementIndex, this.props.element.get('id'));
    }

    isActive = index => {
        const {elementIndex, currentIndex} = this.props;
        return currentIndex.get('elementIndex') === elementIndex && index === currentIndex.get('setIndex');
    }

    onLongPress = () => {
        this.props.dispatch(toggleModal(this.props.elementIndex));
    }

    getValue = (set) => {
        return set.get('amount') ? { value: set.get('amount') } : {}
    }

    render() {
        const {onMetaDataChange, onSetChange, element, currentIndex} = this.props;
        return (
            <TouchableWithoutFeedback onLongPress={this.onLongPress}>
                <View style={styles.container}>
                    <Text style={styles.name}>
                        {element.get('name')}
                    </Text>
                    <View
                        style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        {element.get('sets').map((set, i) => (
                            <TextInput
                                setRef={ref => this.inputs[i] = ref}
                                placeholder={set.get('amount')}
                                onPress={this.onPress}
                                index={i}
                                key={i}
                                onChangeText={kg => this.kg = kg}
                                onBlur={this.onBlur}
                                onSubmitEditing={this.onBlur}
                                keyboardType='phone-pad'
                                style={styles.textInput}
                                isActice={this.isActive(i)}
                                {...this.getValue(set) }
                                />
                        ))}
                    </View>
                </View>
            </TouchableWithoutFeedback>
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

export default connect(({element}) => ({
    currentIndex: element
}))(Elements);