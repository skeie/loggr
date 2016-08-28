/**
* Logs all actions and states after they are dispatched.
*/
export const logger = store => next => action => {
    console.log(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.log(action.type);
    return result;
}
