import { createReducer } from "@reduxjs/toolkit";
import { registerUser } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false
};

const registerReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(registerUser.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false
    };
  });

  // fulfilled
  builder.addCase(registerUser.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: false
    };
  });

  // rejected
  builder.addCase(registerUser.rejected, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: true
    };
  });
});

export default registerReducer;