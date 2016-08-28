/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {onChange} from '../search/searchActions';

const {width} = Dimensions.get('window');
class Topbar extends Component {
    constructor(props) {
      super(props);
    }

 onChangeText = (text) => {
     this.props.dispatch(onChange(text));
 }

  render() {
    return (
      <View style={styles.container}>
          <View style={{flex: 8, backgroundColor: 'red'}}>
              <TextInput
                  style={{height: 40}}
                  onChangeText={this.onChangeText}
                  value={this.props.search.get('searchString')}
              />
          </View>
          <View style={{flex: 2, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
            <Text> Cancel </Text>
          </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    width,
    flexDirection: 'row'
  }
  });

export default connect(({ search }) => (
    {
        search
    }
))(Topbar);


// export default connect(state => ({
//   exercises: state.exercises,
// }))(ListViewWrapper);
