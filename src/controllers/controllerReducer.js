import * as types from './controllerActionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
    keyboardHeight: 0
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.KEYBOARD_HEIGHT_CHANGE:
            return state.set('keyboardHeight', action.height);
        default:
            return state;
    }
}
