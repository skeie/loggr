import React, { Component } from 'react';
import Modal from '../components/modal';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import {
    elementBox,
    setColor,
    exerciseName,
    underlineInActive,
    underlineActive,
    deepPurple
} from '../styles';
import TextInput from '../components/textInput';
import { connect } from 'react-redux';
import { textInputChange, toggleModal } from './elementActions';
import { more, addBtnBlack } from '../Images';
import { onChange } from '../search/searchActions';
import Text from '../components/text';
import { bronse, silver, gold, checked, iconMapping } from '../Images';
import { isAndroid } from '../utils/utils';
const { width, height } = Dimensions.get('window');
import dismissKeyboard from 'dismissKeyboard';
import differenceBy from 'lodash/differenceBy';
import { textStyle } from '../components/text';
import { toggleKeyboard } from '../components/keyboard/keyboardActions';
import { hulkGreen, borderGreen } from '../styles';
import { clearElement } from '../exercises/actions';
const elements = [bronse, silver, gold];

class Elements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            differenceId: ''
        };
        this.inputs = [];
        this.viewRef = {};
        this.iconNumber = Math.floor(Math.random() * (6 - 0) + 0);
    }

    onPress = (index = 0) => {
        if (this.props.element.get('sets').size > index) {
            // don't increment if we are at the last element in the sets array
            this.props.dispatch(textInputChange(this.props.id, index));
        }
    };

    // shouldComponentUpdate({ element }) {
    //     return element !== this.props.element;
    // }

    // shouldSetAutoFocus = currentIndex =>
    //   currentIndex.get("elementId") === this.props.id &&
    //     currentIndex.get("setIndex") != this.props.currentIndex.get("setIndex");

    componentWillReceiveProps({ element, keyboard }) {
        // means that an element has been modified and saved in backend,
        // show feedback
        // if (
        //   element.getIn(["sets", 0, "id"]) ===
        //     this.props.element.getIn(["sets", 0, "id"]) &&
        //   element !== this.props.element
        // ) {
        //   const difference = differenceBy(
        //     element.get("sets").toJS(),
        //     this.props.element.get("sets").toJS(),
        //     "amount"
        //   )[0];
        //   if (Boolean(difference)) {
        //     this.timeout = this.setState(
        //       { differenceId: difference.id },
        //       this.onSaveSuccess
        //     );
        //   }
        // }
        // if (this.shouldSetAutoFocus(currentIndex)) {
        // this.inputs[currentIndex.get('setIndex')].focus();
        // }
        const oldShowKeyboard = this.props.keyboard.get('showKeyboard');
        if (this.shouldSaveSet(keyboard)) {
            this.saveSet(keyboard);
        } else if (!keyboard.get('showKeyboard') && oldShowKeyboard) {
            if (this.shouldSaveSet(keyboard)) {
                this.saveSet(keyboard);
            }
        }
        this.updateNextFocus(keyboard);
    }

    updateNextFocus = keyboard => {
        const currentElementId = keyboard.get('currentElementId');
        if (this.isCurrentElement() && Boolean(currentElementId)) {
            const sets = this.props.element.get('sets');
            const currentActiveId = currentElementId;
            const currentIndex = sets.findIndex(
                set => set.get('id') === currentActiveId
            );

            if (currentIndex !== sets.size - 1) {
                this.updateKeyboard(sets.get(currentIndex + 1));
            }
        }
    };

    shouldSaveSet = newKeyboard =>
        this.isCurrentElement() &&
            this.isSetChange(newKeyboard) &&
            Boolean(this.props.keyboard.get('element').size);

    isCurrentElement = () =>
        this.props.keyboard.getIn(['element', 'elementId']) ===
            this.props.element.get('id');

    isSetChange = newKeyboard =>
        newKeyboard.getIn(['element', 'setId']) !==
            this.props.keyboard.getIn(['element', 'setId']);

    saveSet = keyboard => {
        const oldSetid = this.props.keyboard.getIn(['element', 'setId']);
        const newSetId = keyboard.getIn(['element', 'newSetId']);
        if (newSetId !== oldSetid) {
            const index = this.props.element
                .get('sets')
                .findIndex(
                    set =>
                        this.props.keyboard.getIn(['element', 'setId']) ===
                            set.get('id')
                );
            this.onBlur(index);
        }
    };

    onSaveSuccess = () => {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(
            () => {
                this.setState({
                    differenceId: ''
                });
            },
            2000
        );
    };

    onBlur = index => {
        const { element } = this.props;
        const elementId = element.getIn(['sets', index, 'id']);
        this.props.onSetChange(
            elementId,
            this.props.keyboard.get('text'),
            index
        );
        // setTimeout(() => { this.onPress(index + 1); })
        //this.setNextActive(index + 1);
        // setTimeout(() => { this.props.dispatch(onChange('')) })
    };

    setNextActive = index => {
        if (this.props.element.get('sets').size > index) {
            // not a brand new exercise, try not to autocomplete
            if (this.inputs[index].props.value !== '0') {
                this.kg = '';
            }

            this.inputs[index].focus();
        }
    };

    onDelete = () => {
        this.props.onDelete(this.props.elementId, this.props.element.get('id'));
    };

    onEdit = () => {
        this.props.dispatch(toggleModal(this.props.id));
    };

    getValue = set => {
        const { keyboard } = this.props;
        if (
            keyboard.getIn(['element', 'elementId']) ===
                this.props.element.get('id') &&
            keyboard.getIn(['element', 'setId']) == set.get('id')
        ) {
            return keyboard.get('text');
        }
        return set.get('amount');
    };

    onLayout = event => {
        this.y = event.nativeEvent.layout.y;
    };

    onElementPressed = set => {
        this.props.scrollTo(this.y);
        this.updateKeyboard(set);
        //this.props.dispatch(clearElement(set.get('id')));
    };

    updateKeyboard = set => {
        this.props.dispatch(
            toggleKeyboard({
                setId: set.get('id'),
                elementId: this.props.element.get('id'),
                value: true,
                text: ''
            })
        );
    };

    getActiveStyle = setId => {
        return this.props.keyboard.getIn(['element', 'setId']) === setId
            ? {
                  borderColor: borderGreen,
                  borderWidth: 5
              }
            : {};
    };

    render() {
        const {
            onSetChange,
            element,
            currentIndex,
            getScrollTo,
            toggleKeyboard
        } = this.props;
        const fontSize = {
            fontSize: element.get('name').length >= 16 ? 26 : 38
        };
        const androidWidth = isAndroid() && { width };

        return (
            <View onLayout={this.onLayout}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 15,
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={[styles.name, fontSize]}>
                        {element.get('name')}
                    </Text>
                    <Text onPress={this.onEdit} style={styles.editbtn}>
                        EDIT
                    </Text>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    horizontal
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {element.get('sets').map((set, i) => {
                        return (
                            <TouchableHighlight
                                onPress={() => this.onElementPressed(set)}
                                style={{
                                    backgroundColor: deepPurple,
                                    marginHorizontal: 10,
                                    borderRadius: 13,
                                    flex: 1,
                                    height: 180,
                                    ...this.getActiveStyle(set.get('id'))
                                }}
                                key={set.get('id')}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        flex: 1
                                    }}
                                >
                                    <Text
                                        fontFamily="regular"
                                        style={styles.elementTitle}
                                    >
                                        Set {i + 1}
                                    </Text>
                                    <Image
                                        style={{ width: 90, height: 90 }}
                                        source={
                                            set.get('id') ===
                                                this.state.differenceId
                                                ? checked
                                                : iconMapping[this.iconNumber][
                                                      i
                                                  ]
                                        }
                                    />
                                    <Text
                                        setRef={ref => this.inputs[i] = ref}
                                        placeholder={set.get('amount')}
                                        index={i}
                                        key={i}
                                    >
                                        {this.getValue(set)}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        alignSelf: 'flex-start',
        fontSize: 35,
        color: exerciseName,
        marginLeft: 16
    },
    textInput: {
        height: 50,
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'FredokaOne_Regular'
    },
    elementTitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#FFFFFF'
    },
    editbtn: {
        fontSize: 16,
        color: '#FFFFFF',
        marginRight: 10
    }
});

export default connect(({ element, keyboard }) => ({
    currentIndex: element,
    keyboard
}))(Elements);
