import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../config/env.config";

const initialState = {
  data: [],
  filteredData: [],
  totalPages: 1,
  loading: false,
  status: "idle",
  error: null,
};


export const fetchData = createAsyncThunk("data/fetchData", async (page) => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const response = await axios.get(backendUrl +
    `/api/get-transactions-limit/${page}`,
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;

});

export const filterData = createAsyncThunk(
  "data/filterData",
  async (params) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const { status, sdate, edate } = params;
    if (status === "" && sdate !== "") {
      const response = await axios.get(backendUrl +
        `/api/get-TransactionDate/${sdate}/${edate}/`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      return response.data;
    } else if (status !== "" && sdate === "") {
      const response = await axios.get(backendUrl +
        `/api/get-transaction-status/${status}/`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      return response.data;
    } else if (status && sdate !== "") {
      const response = await axios.get(backendUrl +
        `/api/get-TransactionStatusDate/${status}/${sdate}/${edate}/`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(backendUrl +
        "/api/get-transactions/",
        {
          headers: { Authorization: `${token}` },
        }
      );
      return response.data;
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = action.payload;
        state.totalPages = Math.ceil(action.payload['total_data']);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(filterData.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(filterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredData = action.payload;
        state.loading = false;
      })
      .addCase(filterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectData = (state) => state.data.data;
export const totalPages = (state) => state.totalPages;
export const selectFilteredData = (state) => state.data.filteredData;

export default dataSlice.reducer;
