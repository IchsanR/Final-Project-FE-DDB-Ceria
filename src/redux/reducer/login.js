import { createReducer } from "@reduxjs/toolkit";
import { loginUser } from "../api/user";
import { revertAll } from "../api/resetState";

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  isFulfilled: false
};

const loginReducer = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(loginUser.pending, (state) => {
    return {
      ...state,
      data: [],
      isLoading: true,
      isError: false,
      isFulfilled: false
    };
  });

  // fulfilled
  builder.addCase(loginUser.fulfilled, (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      isLoading: false,
      isError: false,
      isFulfilled: true
    };
  });

  // rejected
  builder.addCase(loginUser.rejected, (state, action) => {
    return {
      ...state,
      data: action.error,
      isLoading: false,
      isError: true,
      isFulfilled: false
    };
  });

  // Logout
  builder.addCase(revertAll, () => initialState);
});

export default loginReducer;