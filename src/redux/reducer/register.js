import { createReducer } from "@reduxjs/toolkit";
import { registerUser } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  isFulfilled: false
};

const registerReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(registerUser.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  // fulfilled
  builder.addCase(registerUser.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  // rejected
  builder.addCase(registerUser.rejected, (state, action) => {
    return {
      ...state,
      data: action,
      isLoading: false,
      isError: true,
      isFulfilled: false
    };
  });
});

export default registerReducer;