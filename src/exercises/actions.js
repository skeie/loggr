import * as types from './actionTypes';
import { post, get, del, put } from '../utils/fetch';

export const getAll = (id) => (
    {
        type: [
            types.GET_EXERCISE,
            types.GET_EXERCISE_SUCCESS,
            types.GET_EXERCISE_FAIL
        ],
        promise: () => get(`/exercises/${id}`),
    }
)

export const addExercise = (name, id) => {
    const exercise = { exercise: { name, body: '' } };
    return {
        type: [
            types.ADD_EXERCISE,
            types.ADD_EXERCISE_SUCCESS,
            types.ADD_EXERCISE_FAIL
        ],
        promise: () => post(`/exercises/${id}`, exercise),
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

export const onExerciseUpdate = (id, exercise) => (
    {
        type: [
            types.EXERCISE_UPDATE,
            types.EXERCISE_UPDATE_SUCCESS,
            types.EXERCISE_UPDATE_FAIL
        ],
        promise: () => put(`/exercises/${id}`, { exercise }),
        exercise,
        id,
    }
);

export const onDelete = (id) => (
    {
        type: [
            types.DELETE_EXERCISE,
            types.DELETE_EXERCISE_SUCCESS,
            types.DELETE_EXERCISE_FAIL
        ],
        promise: () => del(`/exercises/${id}`),
        id
    }
);

export const toggleCreateModal = () => (
    {
        type: types.TOGGLE_CREATE_MODAL
    }
)

export const clearElement = (elementId) => (
    {
        type: types.CLEAR_ELEMENT,
        elementId
    }
)