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

export const addSet = (elementId, element, index) => (
    {
        type: [
            types.ADD_SET,
            types.ADD_SET_SUCCESS,
            types.ADD_SET_FAIL
        ],
        promise: () => put(`/elements/${elementId}`, { element }),
        elementId,
        element,
        index
    }
);

export const onExerciseUpdate = (id, exercise, elementIndex) => (
    {
        type: [
            types.EXERCISE_UPDATE,
            types.EXERCISE_UPDATE_SUCCESS,
            types.EXERCISE_UPDATE_FAIL
        ],
        promise: () => put(`/exercises/${id}`, { exercise }),
        exercise,
        id,
        elementIndex
    }
);

export const onDelete = (id, index) => (
    {
        type: [
            types.DELETE_EXERCISE,
            types.DELETE_EXERCISE_SUCCESS,
            types.DELETE_EXERCISE_FAIL
        ],
        promise: () => del(`/exercises/${id}`),
        id,
        index
    }
);

export const toggleCreateModal = () => (
    {
        type: types.TOGGLE_CREATE_MODAL
    }
)

