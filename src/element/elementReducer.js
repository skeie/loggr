import { fromJS, List, Record } from 'immutable';
import * as types from './elementAcitonTypes';

const initialState = fromJS({
    elementIndex: 0,
    setIndex: 0
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.INPUT_FIELD_CHANGE:
            const { elementIndex, setIndex } = action;            
            return state.merge({
                elementIndex,
                setIndex
            });

        default:
            return state;
    }
}
