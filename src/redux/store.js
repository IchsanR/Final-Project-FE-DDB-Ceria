import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { userApi } from "./api/User";
import rootReducer from "./reducer/reducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, userApi.middleware),
});
