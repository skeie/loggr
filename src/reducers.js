import { combineReducers } from 'redux';
import exercises from './exercises/reducer';
import element from './element/elementReducer';
import search from './search/searchReducer';
import controll from './controllers/controllerReducer';
import user from './user/userReducer';
import keyboard from './components/keyboard/keyboardReducer';
const rootReducer = combineReducers({
    exercises,
    search,
    element,
    controll,
    user,
    keyboard
});

export default rootReducer;
