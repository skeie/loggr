import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    TextInput,
    Image,
    TouchableHighlight,
} from 'react-native';
import { addExercise,
    addSet,
    onMetaDataChange,
    onDelete
} from './actions';
import Element from './element';
import { connect } from 'react-redux';
import Modal from '../components/modal';
const styles = StyleSheet.create({
    listContainer: {
        flex: 9,
        backgroundColor: '#FF7286'
    },
    headerContainer: {
        flexDirection: 'row',
        flex: 1
    },
    textInput: {
        flex: 1,
        height: 40
    }
});


class ListViewWrapper extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !immutable.is(r1, r2) });
        this.state = {
            exercises: this.ds.cloneWithRows(this.props.exercises.get('exercises').toArray()),
            text: '',
        }
    }

    static propTypes = {

    }

    onAddPress = () => {
        this.props.dispatch(addExercise(this.state.text));
        this.setState({
            text: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.exercises !== this.props.exercises) {
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

    onSetChange = (setIndex, kg, index) => {
        this.props.dispatch(addSet(setIndex, kg, index));
    }

    renderHeader = () => (
        <View style={styles.headerContainer}>
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        <TouchableHighlight onPress={this.onAddPress}>
            <Image source={require('./imgs/plus.png')}/>
        </TouchableHighlight>
        </View>
    )

    onMetaDataChange = (metaData, index) => {
        this.props.dispatch(onMetaDataChange(metaData, index))
    }

    onDelete = (index) => {
        this.props.dispatch(onDelete(index))
    }

    renderRow = (element, sec, i) => <Element element={element} index={i} onMetaDataChange={this.onMetaDataChange} onSetChange={this.onSetChange} onDelete={this.onDelete}/>

    render () {
        return (
            <View style={styles.listContainer}>
            <ListView
              renderHeader={this.renderHeader}
              style={styles.listContainer}
              dataSource={this.state.exercises}
              renderRow={this.renderRow}
              initialListSize={25}
              enableEmptySections
            />
            </View>
        );
    }
}

export default connect(state => ({
  exercises: state.exercises,
  search: state.search
}))(ListViewWrapper);
