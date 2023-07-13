import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer/reducer";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import dataReducer from './slice/dataSlice';
import { revertSlice } from "./api/resetState";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

// export const persistor = persistStore(store);

export default store;