import { combineReducers } from 'redux';
import exercises from './exercises/reducer';
import search from './search/searchReducer';
const rootReducer = combineReducers({
    exercises,
    search
});

export default rootReducer;
