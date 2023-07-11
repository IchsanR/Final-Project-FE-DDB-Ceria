import { combineReducers } from "redux";
<<<<<<< HEAD
import { userApi } from "../api/User";
// import { apiModal } from "../api/exportCsvApi";
// import exportsCsv from "./export";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  // [apiModal.reducerPath]: apiModal.reducer,
  // apiModal : exportsCsv
=======
import loginReducer from "./login";
import registerReducer from "./register";
import sendVerificationReducer from "./sendVerification";
import compareVerificationReducer from "./compareVerification";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  sendVerification: sendVerificationReducer,
  compareVerification: compareVerificationReducer
>>>>>>> 087278e2e4b477399f09685007b1831623e96311
});

export default rootReducer;
