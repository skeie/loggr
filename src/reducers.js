import { combineReducers } from 'redux';
import exercises from './exercises/reducer';
import element from './element/elementReducer';
import search from './search/searchReducer';
const rootReducer = combineReducers({
    exercises,
    search,
    element
});

export default rootReducer;
