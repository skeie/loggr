import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './middleware';
import rootReducer from './reducers';

import injectDependencies from './utils/injectDependencies';

let middlewares;

if (__DEV__) {
  middlewares = [
    injectDependencies(),
    thunk,
    logger,
  ];
} else {
  middlewares = [
    injectDependencies(),
    thunk,
  ];
}

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(rootReducer);

export function loadOfflineData() {
  // const load = storage.createLoader(engine);

  // return load(store)
  //   .catch((error) => {
  //       console.error('Failed to get loaded state', error);
  //   });
}
