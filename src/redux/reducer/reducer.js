import { combineReducers } from "redux";
import { userApi } from "../api/User";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
 });

export default rootReducer;
