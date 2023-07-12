import { createReducer } from "@reduxjs/toolkit";
import { updatePassword } from "../api/user";
import { revertAll } from "../api/resetState";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isFulfilled: false
};

const updatePasswordReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(updatePassword.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  // fulfilled
  builder.addCase(updatePassword.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  // rejected
  builder.addCase(updatePassword.rejected, (state, action) => {
    return {
      ...state,
      data: action,
      isLoading: false,
      isError: true,
      isFulfilled: false
    };
  });

  builder.addCase(revertAll, () => initialState);
});

export default updatePasswordReducer;