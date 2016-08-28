import {SEARCH_CHANGE} from './searchActionTypes';
export const onChange = (searchString) => (
    {
        type: SEARCH_CHANGE,
        searchString
    }
)
