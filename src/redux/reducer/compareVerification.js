import { createReducer } from "@reduxjs/toolkit";
import { compareVerificationCode } from "../api/user";

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

const compareVerificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(compareVerificationCode.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    })
    .addCase(compareVerificationCode.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    })
    .addCase(compareVerificationCode.rejected, (state, action) => {
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
      };
    });
});

export default compareVerificationReducer;
