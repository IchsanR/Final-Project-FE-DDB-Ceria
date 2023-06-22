import { createReducer } from "@reduxjs/toolkit";
import { apiCsv } from "../api/exportCsvApi";

const initialState = {
  data: [],
  isloading: true,
  isError: false,
}

const exportsCsv = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(apiCsv.pending, (state) => {
    return {
      ...state,
      isloading: true,
    }
  })
  // fulfilled
  builder.addCase(apiCsv.fulfilled, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action.payload.data,
      isError: false,
    }
  })
  // rejected
  builder.addCase(apiCsv.rejected, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action.payload.data,
      isError: true,
    }
  })
})

export default exportsCsv;