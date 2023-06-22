import { combineReducers } from "redux";
import { userApi } from "../api/User";
// import { apiModal } from "../api/exportCsvApi";
import exportsCsv from "./export";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  // [apiModal.reducerPath]: apiModal.reducer,
  apiModal : exportsCsv


});

export default rootReducer;
