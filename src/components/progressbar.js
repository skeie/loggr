import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  ProgressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const TdProgressbar = ({text}) => (
  <View style={styles.ProgressBarContainer}>
    <ActivityIndicator />
    {text && <Text>{text}</Text>}
  </View>
);

TdProgressbar.PropTypes = {
  text: PropTypes.string
};

export default TdProgressbar;
