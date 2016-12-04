
import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { create } from '../Images/index';
import { width } from '../utils/utils';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const CreateButton = ({ onCreate }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onCreate}>
            <Image source={create} style={{ alignSelf: 'center', marginBottom: 20 }} />
        </TouchableOpacity>
    </View>
);

export default CreateButton;