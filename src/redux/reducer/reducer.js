import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import sendVerificationReducer from "./sendVerification";
import compareVerificationReducer from "./compareVerification";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  sendVerification: sendVerificationReducer,
  compareVerification: compareVerificationReducer
});

export default rootReducer;
