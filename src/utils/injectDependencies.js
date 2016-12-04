import _isArray from 'lodash/lang/isArray';

function exec(next, action, result) {
  const { promise, type, ...rest } = action;
  // normal single action
  if (!promise) {
    return next(action);
  }

  // promise action
  const [REQUEST, SUCCESS, FAILURE] = type;
  next({...rest, type: REQUEST});

return promise({ result }).then(
  (payload) => next({...rest, payload, type: SUCCESS}),
  (error) => {
    next({...rest, error, type: FAILURE, payload: error})
    }
  ).catch((error) => {
  console.error('MIDDLEWARE ERROR:', error);
  next({...rest, error, type: FAILURE});
  });
}


export default function injectDependencies() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return exec(next, action);

    };
  };
}