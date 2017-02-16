import { combineReducers } from 'redux';
import exercises from './exercises/reducer';
import element from './element/elementReducer';
import search from './search/searchReducer';
import controll from './controllers/controllerReducer';
import user from './user/userReducer';
const rootReducer = combineReducers({
    exercises,
    search,
    element,
    controll,
    user
});

export default rootReducer;
