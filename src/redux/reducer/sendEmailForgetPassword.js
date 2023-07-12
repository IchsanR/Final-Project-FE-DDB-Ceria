import { createReducer } from "@reduxjs/toolkit";
import { sendEmailForgotPassword } from "../api/user";
import { revertAll } from "../api/resetState";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  isFulfilled: false
};

const sendEmailForgetReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(sendEmailForgotPassword.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  // fulfilled
  builder.addCase(sendEmailForgotPassword.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  // rejected
  builder.addCase(sendEmailForgotPassword.rejected, (state, action) => {
    return {
      ...state,
      data: action.error,
      isLoading: false,
      isError: true,
      isFulfilled: false
    };
  });

  builder.addCase(revertAll, () => initialState);
});

export default sendEmailForgetReducer;