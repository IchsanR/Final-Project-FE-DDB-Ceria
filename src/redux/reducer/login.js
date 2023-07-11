import { createReducer } from "@reduxjs/toolkit";
import { loginUser } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false
};

const loginReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(loginUser.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false
    };
  });

  // fulfilled
  builder.addCase(loginUser.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: false
    };
  });

  // rejected
  builder.addCase(loginUser.rejected, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: true
    };
  });
});

export default loginReducer;