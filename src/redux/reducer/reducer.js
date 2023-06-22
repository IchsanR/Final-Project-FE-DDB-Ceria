import { combineReducers } from "redux";
import { userApi } from "../api/User";
import { apiModal } from "../api/exportCsvApi";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [apiModal.reducerPath]: apiModal.reducer,

});

export default rootReducer;
