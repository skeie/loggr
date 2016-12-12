import React, { Component } from 'react';
import Modal from '../components/modal';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
    Animated,
    PanResponder
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
import { textInputChange } from './elementActions';
import generateProps from 'react-generate-props'
const {width, height} = Dimensions.get('window');


class Elements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                console.log(gestureState.move{X,Y})

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }


    onPress = (index = this.state.index) => {
        this.props.dispatch(textInputChange(this.props.elementIndex, index));
    }

    shouldComponentUpdate({currentIndex}) {
        return currentIndex.get('elementIndex') === this.props.elementIndex ||
            this.props.elementIndex === this.props.currentIndex.get('elementIndex')
    }


    onBlur = (index) => {
        if (this.kg) {
            const elementId = this.props.element.getIn(['sets', index, 'id']);
            this.props.onSetChange(elementId, this.kg, index);
            setTimeout(() => { console.log('yes'); this.onPress(index + 1); })
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



    render() {
        const {onMetaDataChange, onSetChange, element, currentIndex} = this.props;

        return (
            <View style={styles.container}>

                <Text style={styles.name}>
                    {element.get('name')}
                </Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <Animated.View {...this.panResponder.panHandlers}>
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
                                keyboardType='phone-pad'
                                onScroll={l => console.log('onScroll 1337', l)} />
                        ))}
                    </Animated.View>
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

export default connect(({element}) => ({
    currentIndex: element
}))(Elements);