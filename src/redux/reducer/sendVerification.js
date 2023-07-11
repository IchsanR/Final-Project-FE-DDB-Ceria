import { createReducer } from "@reduxjs/toolkit";
import { sendEmailVerification } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false
};

const sendVerificationReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(sendEmailVerification.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false
    };
  });

  // fulfilled
  builder.addCase(sendEmailVerification.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: false
    };
  });

  // rejected
  builder.addCase(sendEmailVerification.rejected, (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isError: true
    };
  });
});

export default sendVerificationReducer;