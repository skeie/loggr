import * as types from './actionTypes';
import { post, get, del, put } from '../utils/fetch';

export const getAll = () => (
    {
        type: [
            types.GET_EXERCISE,
            types.GET_EXERCISE_SUCCESS,
            types.GET_EXERCISE_FAIL
        ],
        promise: () => get('/exercises'),
    }
)

export const addExercise = (name) => {
    const exercise = { exercise: { name, body: '' } };
    return {
        type: [
            types.ADD_EXERCISE,
            types.ADD_EXERCISE_SUCCESS,
            types.ADD_EXERCISE_FAIL
        ],
        promise: () => post('/exercises/1', exercise),
        ...exercise
    }
};

export const addSet = (elementId, amount, index) => (
    {
        type: [
            types.ADD_SET,
            types.ADD_SET_SUCCESS,
            types.ADD_SET_FAIL
        ],
        promise: () => put(`/elements/${elementId}`, { element: { amount } }),
        elementId,
        amount,
        index
    }
);

export const onMetaDataChange = (body, id) => (
    {
        type: [
            types.METADATA_CHANGE,
            types.METADATA_CHANGE_SUCCESS,
            types.METADATA_CHANGE_FAIL
        ],
        promise: () => put(`/exercises/${id}`, { exercise: { body } }),
    }
);

export const onDelete = (index, id) => (
    {
        type: [
            types.DELETE_SET,
            types.DELETE_SET_SUCCESS,
            types.DELETE_SET_FAIL
        ],
        promise: () => del(`/exercises/${id}`),
        id,
        index
    }
);

