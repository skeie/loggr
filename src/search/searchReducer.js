import { fromJS, List, Record } from 'immutable';
import { SEARCH_CHANGE } from './searchActionTypes';
const initialState = fromJS({
  searchString: ''
});

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SEARCH_CHANGE:
            return state.set('searchString', action.searchString)
        default:
            return state;
    }
}
