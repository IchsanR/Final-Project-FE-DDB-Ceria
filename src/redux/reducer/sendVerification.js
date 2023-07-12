import { createReducer } from "@reduxjs/toolkit";
import { sendEmailVerification } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  isFulfilled: false
};

const sendVerificationReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(sendEmailVerification.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  // fulfilled
  builder.addCase(sendEmailVerification.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  // rejected
  builder.addCase(sendEmailVerification.rejected, (state, action) => {
    return {
      ...state,
      data: action,
      isLoading: false,
      isError: true,
      isFulfilled: false
    };
  });
});

export default sendVerificationReducer;