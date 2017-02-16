import { fromJS, List, Record } from "immutable";
import * as types from "./userActionTypes";
const initialState = fromJS({
  jwtToken: "",
  name: "",
  email: "",
  image: ""
});


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
        return state.merge({
            ...action.payload
        });
     
    default:
      return state;
  }
}
