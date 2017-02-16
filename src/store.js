import { createStore, applyMiddleware } from "redux";
import { logger } from "./middleware";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { USER_LOGIN_SUCCESS } from "./user/userActionTypes";
import immutablejs from "redux-storage-decorator-immutablejs";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import * as storage from "redux-storage";
import injectDependencies from "./utils/injectDependencies";
import { setAuthorizationToken } from "./utils/fetch";
const reducer = storage.reducer(rootReducer);
let engine = createEngine("td-call-call-super-secret-key");
engine = immutablejs(engine, ["user"]);
const offlineStorage = storage.createMiddleware(engine, [], [
  USER_LOGIN_SUCCESS
]);

let middlewares;

if (__DEV__) {
  middlewares = [injectDependencies(), logger, offlineStorage];
} else {
  middlewares = [injectDependencies(), offlineStorage];
}

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(reducer);

export function loadOfflineData() {
  const load = storage.createLoader(engine);

  return load(store)
    .then(newState => {
      const { user } = newState;
      if (user && user.get) {
        return setAuthorizationToken(user.get("jwtToken"));
      } else {
        return Promise.resolve();
      }
    })
    .catch(error => {
      console.log(`Failed to get loaded state`, error);
      return Promise.resolve();
    });
}
