import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    addExercise,
    addSet,
    onMetaDataChange,
    onDelete,
    getAll
} from './actions';
import Element from '../element/element';
import { connect } from 'react-redux';
import Modal from '../components/modal';
import { greyBackground } from '../styles';
import { Map, List } from 'immutable';
import { create } from '../Images/index';
import CreateButton from './createButton';
import CreateModal from './create';
import dismissKeyboard from 'dismissKeyboard';

const styles = StyleSheet.create({
    listContainer: {
        flex: 9,
        backgroundColor: greyBackground
    },
    headerContainer: {
        flexDirection: 'row',
        flex: 1,
        margin: 5
    },
    textInput: {
        flex: 1,
        height: 40
    },
    separator: {
        marginVertical: 10,
    },
});


class ListViewWrapper extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !immutable.is(r1, r2) });
        this.state = {
            exercises: this.ds.cloneWithRows(this.props.exercises.get('exercises').toArray()),
            text: '',
            showModal: false,
        }
        props.dispatch(getAll());
    }

    static propTypes = {

    }

    onAddPress = () => {
        debugger;
        this.props.dispatch(addExercise(this.text));
        this.setState({
            showModal: false
        });
        dismissKeyboard();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.exercises !== this.props.exercises) {
            this.setState({
                exercises: this.ds.cloneWithRows(nextProps.exercises.get('exercises').toArray())
            });
        } if (nextProps.search !== this.props.search) {
            const regex = new RegExp(nextProps.search.get('searchString'), 'i');
            const filtered = nextProps.exercises.get('exercises').filter(exercise => (
                exercise.get('name').search(regex) > -1
            )
            );
            this.setState({
                exercises: this.ds.cloneWithRows(filtered.toArray())
            });
        }
    }

    onSetChange = (elementId, kg, index) => {
        this.props.dispatch(addSet(elementId, kg, index));
    }

    onMetaDataChange = (metaData, index) => {
        this.props.dispatch(onMetaDataChange(metaData, index))
    }

    onDelete = (index, id) => {
        this.props.dispatch(onDelete(index, id))
    }

    toggleCreate = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        })
        );
    }

    onChangeText = text => this.text = text;

    renderRow = (element, sec, i) => {
        return (
            <Element
                elementIndex={parseInt(i, 10)}
                element={element}
                id={element.get('id')}
                onMetaDataChange={this.onMetaDataChange}
                onSetChange={this.onSetChange}
                onDelete={this.onDelete} />
        );
    }


    render() {

        return (
            <View style={styles.listContainer}>
                <ListView
                    style={styles.listContainer}
                    dataSource={this.state.exercises}
                    renderRow={this.renderRow}
                    initialListSize={25}
                    renderSeparator={
                        (sectionId, rowId) => <View key={rowId} style={styles.separator} />
                    }
                    enableEmptySections
                    />

                <CreateButton onCreate={this.toggleCreate} />
                <CreateModal
                    onChangeText={this.onChangeText}
                    onBlur={this.onAddPress}
                    showModal={this.state.showModal}
                    onClose={this.toggleCreate}
                    />
            </View>
        );
    }
}

export default connect(state => ({
    exercises: state.exercises,
    search: state.search
}))(ListViewWrapper);
