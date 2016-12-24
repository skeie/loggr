import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    StyleSheet
} from 'react-native';

const EditExercise = ({
    onBlur,
    onChangeText
}) => (
        <View style={styles.innerContainer}>
            <Text style={styles.title}>New Workout</Text>
            <TextInput
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder='Name'
                text=''
                isActice
                style={styles.textInput}
                placeholderTextColor={setColor}
                onSubmitEditing={onBlur}
                autoFocus
                />
        </View>
    );