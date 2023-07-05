import { createReducer } from "@reduxjs/toolkit";
import { compareVerificationCode } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false
};

const compareVerificationReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(compareVerificationCode.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false
    };
  });

  // fulfilled
  builder.addCase(compareVerificationCode.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: false
    };
  });

  // rejected
  builder.addCase(compareVerificationCode.rejected, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: true
    };
  });
});

export default compareVerificationReducer;