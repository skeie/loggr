import { fromJS, List, Record } from 'immutable';
import * as types from './actionTypes';
const initialState = fromJS({
  exercises: new List(),
  isFetching: false,
  error: '',
  success: ''
});

let newExercise = {};
let exercise = {};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_EXERCISE_SUCCESS:
      debugger;
      const exercises = state.get('exercises');
      newExercise = new Exercise(fromJS(action.payload));
      return state.set('exercises', exercises.push(newExercise));
    case types.ADD_SET_SUCCESS:
      const sets = state.getIn(['exercises', action.index, 'sets']);
      newExercise = sets.setIn([action.setIndex, 'amount'], action.amount);
      return state.setIn(['exercises', action.index, 'sets'], newExercise);
    case types.DELETE_SET:
      const newExercises = state.get('exercises').remove(action.index);
      return state.set('exercises', newExercises);
    case types.METADATA_CHANGE:
      exercise = state.getIn(['exercises', action.index]);
      return state.setIn(['exercises', action.index, 'metaData'], action.metaData);
    case types.GET_EXERCISE:
      return state.merge({
        isFetching: true,
        error: '',
        success: ''
      });
    case types.GET_EXERCISE_FAIL:
      return state.merge({
        isFetching: false,
        error: 'Something went wrong',
        success: ''
      });
    case types.GET_EXERCISE_SUCCESS:
      const newData = action.payload.data.map(exercise => {
        return new Exercise(fromJS(exercise));
      }); 
    
      return state.merge({
        isFetching: false,
        error: '',
        success: 'Success',
        exercises: newData
      });
    default:
      return state;
  }
}


export const Exercise = Record({
  id: '',
  name: '',
  sets: new List(),
  metaData: '',
  updated: ''
});
