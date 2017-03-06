import * as types from './keyboardActionTypes';
import { fromJS, Map } from 'immutable';

const initialState = fromJS({
    element: new Map(),
    showKeyboard: false,
    text: '',
    currentElementId: ''
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_KEYBOARD:
            const {
                value = !state.get('showKeyboard'),
                text = '',
                setLength = 0,
                ...element
            } = action.data;
            if(text === '0') text = '';
            return state.merge({
                element,
                showKeyboard: value,
                text,
                setLength
            });
        case types.KEYBOARD_UPDATE:
            return state.set('text', state.get('text') + action.text);
        case types.KEYBOARD_REMOVE_LAST_CHAR:
            return state.set('text', state.get('text').slice(0, -1));
        case types.KEYBOARD_NEXT_ELEMENT:
            return state.set(
                'currentElementId',
                state.getIn(['element', 'setId'])
            );
        default:
            return state;
    }
}
