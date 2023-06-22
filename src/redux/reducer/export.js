import { createReducer } from "@reduxjs/toolkit";
import { apiModal } from "../api/exportCsvApi";

const initialState = {
  data: [],
  isloading: true,
  isError: false,
}

const exportsCsv = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(apiModal.pending, (state) => {
    return {
      ...state,
      isloading: true,
    }
  })
  // fulfilled
  builder.addCase(apiModal.fulfilled, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action.payload.data,
      isError: false,
    }
  })
  // rejected
  builder.addCase(apiModal.rejected, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action.payload.data,
      isError: true,
    }
  })
})

export default exportsCsv;