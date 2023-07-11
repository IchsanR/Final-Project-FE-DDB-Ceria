import { combineReducers } from "redux";
import {userApi} from "../api/user"
import loginReducer from "./login";
import registerReducer from "./register";
import sendVerificationReducer from "./sendVerification";
import compareVerificationReducer from "./compareVerification";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  login: loginReducer,
  register: registerReducer,
  sendVerification: sendVerificationReducer,
  compareVerification: compareVerificationReducer
});

export default rootReducer;
