import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import sendVerificationReducer from "./sendVerification";
import compareVerificationReducer from "./compareVerification";
import updatePasswordReducer from "./updatePassword";
import sendEmailForgetReducer from "./sendEmailForgetPassword";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  sendVerification: sendVerificationReducer,
  sendEmailForget: sendEmailForgetReducer,
  updatePassword: updatePasswordReducer,
  compareVerification: compareVerificationReducer,
});

export default rootReducer;
