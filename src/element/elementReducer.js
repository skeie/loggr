import { fromJS, List, Record } from 'immutable';
import * as types from './elementAcitonTypes';

const initialState = fromJS({
    setIndex: 0,
    showMetaModal: false,
    elementId: '',
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.INPUT_FIELD_CHANGE: {
            const { elementId, setIndex } = action;
            return state.merge({
                elementId,
                setIndex
            });
        }
        case types.ELEMENT_TOGGLE_MODAL:
            const { elementId } = action;
            return state.merge({
                showMetaModal: !state.get('showMetaModal'),
                elementId
            });
        case types.ELEMENT_INIT_STATE:
            return initialState;

        default:
            return state;
    }
}
