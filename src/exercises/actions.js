import { ADD_EXERCISE, ADD_SET, DELETE_SET, METADATA_CHANGE } from './actionTypes';

export const addExercise = (name) => (
    {
        type: ADD_EXERCISE,
        name
    }
);

export const addSet = (setIndex, kg, index) => (
    {
        type: ADD_SET,
        index,
        kg,
        setIndex
    }
);

export const onMetaDataChange = (metaData, index) => (
    {
        type: METADATA_CHANGE,
        metaData,
        index
    }
);

export const onDelete = (index) => (
    {
        type: DELETE_SET,
        index
    }
);
