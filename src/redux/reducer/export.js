import { createReducer } from "@reduxjs/toolkit";
import { apiExportCsv } from "../api/exportCsvApi";

const initialState = {
  data: [],
  isloading: true,
  isError: false,
}

const exportsCsv = createReducer(initialState, (builder) => {
  // pending
  builder.addCase(apiExportCsv.pending, (state) => {
    return {
      ...state,
      data: [],
      isloading: true,
      isError: false
    }
  })
  // fulfilled
  builder.addCase(apiExportCsv.fulfilled, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action.payload.data,
      isError: false,
    }
  })
  // rejected
  builder.addCase(apiExportCsv.rejected, (state, action) => {
    return {
      ...state,
      isloading: false,
      data: action,
      isError: true,
    }
  })
})

export default exportsCsv;