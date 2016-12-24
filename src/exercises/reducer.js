import { fromJS, List, Record } from 'immutable';
import * as types from './actionTypes';
const initialState = fromJS({
  exercises: new List(),
  isFetching: false,
  error: '',
  success: '',
  showCreateModal: false
});

let newExercise = {};
let exercise = {};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_EXERCISE_SUCCESS:
      const exercises = state.get('exercises');
      newExercise = new Exercise(fromJS(action.payload));
      return state.set('exercises', exercises.unshift(newExercise)).set('showCreateModal', false);
    case types.ADD_SET_SUCCESS:
      const tempExercises = state.get('exercises');
      return state.set('exercises', tempExercises.map(exercise => exercise.update('sets', sets => (
        sets.map(set => {
          if (set.get('id') === action.elementId) {
            return set.set('amount', action.element.amount);
          } else {
            return set;
          }
        })
      ))));
    case types.DELETE_EXERCISE_SUCCESS:
      console.log('dette er index dau', action.index);

      const newExercises = state.get('exercises').remove(action.index);
      return state.set('exercises', newExercises);
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
    case types.EXERCISE_UPDATE_SUCCESS:
      return state.setIn(['exercises', action.elementIndex], new Exercise(fromJS(action.payload)));
    case types.TOGGLE_CREATE_MODAL: 
      return state.set('showCreateModal', !state.get('showCreateModal'));
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
