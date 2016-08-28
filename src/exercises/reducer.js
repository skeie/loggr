import { fromJS, List, Record } from 'immutable';
import { ADD_EXERCISE, ADD_SET, DELETE_SET, METADATA_CHANGE } from './actionTypes';
const initialState = fromJS({
  exercises: new List()
});

let newExercise = {};
let exercise = {};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_EXERCISE:
          const exercises = state.get('exercises');
          newExercise = new Exercise({name: action.name});
          return state.set('exercises', exercises.push(newExercise));
     case ADD_SET:
         exercise = state.getIn(['exercises', action.index]);
         const sets = exercise.get('sets');
         newExercise = sets.set(action.setIndex, action.kg);
         return state.setIn(['exercises', action.index, 'sets'], newExercise);
     case DELETE_SET:
        const newExercises = state.get('exercises').remove(action.index);
        return state.set('exercises', newExercises);
     case METADATA_CHANGE:
        exercise = state.getIn(['exercises', action.index]);
        return state.setIn(['exercises', action.index, 'metaData'], action.metaData);
    default:
      return state;
  }
}


export const Exercise = Record({
    name: '',
    sets: new List(),
    metaData: ''
});
