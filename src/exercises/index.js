import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    TextInput,
    Image,
    TouchableOpacity,
    ViewPagerAndroid,
    Text
} from 'react-native';
import {
    addExercise,
    addSet,
    onMetaDataChange,
    onDelete,
    getAll,
    toggleCreateModal
} from './actions';
import Element from '../element/element';
import { connect } from 'react-redux';
import { greyBackground } from '../styles';
import { Map, List } from 'immutable';
import { create } from '../Images/index';
import CreateButton from './components/createButton';
import CreateModal from './components/createModal';
import EditModal from './components/editModal';
import dismissKeyboard from 'dismissKeyboard';
import { showModal } from '../element/elementActions';
import fixture from './fixtures/exercisesFixtures';
import { toggleModal } from '../element/elementActions';
import { primaryColor } from '../styles';
const styles = StyleSheet.create({
    listview: {
        flex: 1,
        height: 200,
        backgroundColor: primaryColor
    },
    listContainer: {
        backfaceVisibility: 'hidden',
        backgroundColor: primaryColor,
        flex: 1

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
        marginVertical: 0,
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }
});


class ListViewWrapper extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !immutable.is(r1, r2) });
        this.state = {
            exercises: this.ds.cloneWithRows(this.props.exercises.get('exercises').toArray()),
            text: '',
            showModal: false,
            showMetaModal: false
        }
        props.dispatch(getAll(this.props.user.get('id')));
    }

    static propTypes = {

    }

    onAddPress = () => {
        this.props.dispatch(addExercise(this.text, this.props.user.get('id')));
        dismissKeyboard();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.exercises !== this.props.exercises && this.props.search.get('searchString')) {
            this.filterNewArray(nextProps);
        } else if (nextProps.exercises !== this.props.exercises) {
            this.setState({
                exercises: this.ds.cloneWithRows(nextProps.exercises.get('exercises').toArray())
            });
        } if (nextProps.search !== this.props.search) {
            this.filterNewArray(nextProps);
        }
    }

    filterNewArray = (nextProps) => {
        this.ref.scrollTo({x: 0, y: 0, animated: true});
        const regex = new RegExp(nextProps.search.get('searchString'), 'i');
        const filtered = nextProps.exercises.get('exercises').filter(exercise => (
            exercise.get('name').search(regex) > -1
        )
        );
        this.setState({
            exercises: this.ds.cloneWithRows(filtered.toArray())
        });
    }

    onSetChange = (elementId, kg, index) => {
        this.props.dispatch(addSet(elementId, { amount: kg }, index));
    }

    onMetaDataChange = (metaData, index) => {
        this.props.dispatch(onMetaDataChange(metaData, index))
    }

    onDelete = (index, id) => {
        this.props.dispatch(onDelete(index, id))
    }

    toggleCreate = () => {
        this.props.dispatch(toggleCreateModal());
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
                onDelete={this.onDelete}
                />
        );
    }

    toggleModal = () => {
        this.props.dispatch(toggleModal(0));
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <ListView
                    ref={(ref) => this.ref = ref}
                    style={styles.listview}
                    dataSource={this.state.exercises}
                    renderRow={this.renderRow}
                    initialListSize={25}
                    enableEmptySections
                    keyboardShouldPersistTaps="handled"
                    />
                <CreateModal
                    onChangeText={this.onChangeText}
                    onBlur={this.onAddPress}
                    showModal={this.props.exercises.get('showCreateModal')}
                    onClose={this.toggleCreate}
                    />
                <EditModal
                    onChangeText={this.onChangeText}
                    onBlur={this.onAddPress}
                    showModal={this.props.element.get('showMetaModal')}
                    onClose={this.toggleModal}
                    />
            </View>
        );
    }
}

export default connect(state => ({
    exercises: state.exercises,
    search: state.search,
    element: state.element,
    user: state.user
}))(ListViewWrapper);
