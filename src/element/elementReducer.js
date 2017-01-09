import { fromJS, List, Record } from 'immutable';
import * as types from './elementAcitonTypes';

const initialState = fromJS({
    elementIndex: 0,
    setIndex: 0,
    showMetaModal: false
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.INPUT_FIELD_CHANGE: {
            const { elementIndex, setIndex } = action;
            return state.merge({
                elementIndex,
                setIndex
            });
        }
        case types.ELEMENT_TOGGLE_MODAL:
            const { elementIndex } = action;
            return state.merge({
                elementIndex,
                showMetaModal: !state.get('showMetaModal')
            });
        case types.ELEMENT_INIT_STATE: 
            return initialState;

        default:
            return state;
    }
}
