import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './middleware';
import rootReducer from './reducers';
import immutablejs from 'redux-storage-decorator-immutablejs';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as storage from 'redux-storage';
import {ADD_EXERCISE_SUCCESS} from './exercises/actionTypes';
import injectDependencies from './utils/injectDependencies';

const reducer = storage.reducer(rootReducer);
let engine = createEngine('td-call-call-super-secret-key');
engine = immutablejs(engine, ['exercises']);

const offlineStorage = storage.createMiddleware(engine,
  [
  ],
  [
      ADD_EXERCISE_SUCCESS
  ]
);


let middlewares;

if (__DEV__) {
  middlewares = [
    injectDependencies(),
    thunk,
    offlineStorage,
    logger,
  ];
} else {
  middlewares = [
    injectDependencies(),
    thunk,
    offlineStorage,
  ];
}

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(reducer);

export function loadOfflineData() {
  const load = storage.createLoader(engine);

  return load(store)
    .catch((error) => {
        console.error('Failed to get loaded state', error);
    });
}