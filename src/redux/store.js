import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { userApi } from "./api/user.js";
import rootReducer from "./reducer/reducer"
import { persistReducer } from "redux-persist";
import dataReducer from './slice/dataSlice'
import { apiModal } from "./api/exportCsvApi";
import { revertSlice } from "./api/resetState";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = configureStore({
  reducer: {
    data: dataReducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, userApi.middleware),
});

export default store