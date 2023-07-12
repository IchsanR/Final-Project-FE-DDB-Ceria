import { createReducer } from "@reduxjs/toolkit";
import { revertAll } from "../api/resetState";
import { compareVerificationCode } from "../api/user";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  isFulfilled: false
};

const compareVerificationReducer = createReducer(initialState, (builder) => {
  builder.addCase(compareVerificationCode.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  builder.addCase(compareVerificationCode.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  builder.addCase(compareVerificationCode.rejected, (state, action) => {
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

export default compareVerificationReducer;
