import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  filteredData: [],
  status: 'idle',
  error: null,
};
const getToken = () => {
    return sessionStorage.getItem('token');
  };
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const token = getToken();
  const response = await axios.get('http://localhost:8081/api/get-transactions',{
    headers: { Authorization: `${token}` },
  })
  return response.data;
});

export const filterData = createAsyncThunk('data/filterData', async (params) => {
  const { status, sdate,edate } = params;
//   console.log("inidataaaaa"+start,end)
const token = getToken();
  const response = await axios.get(`http://localhost:8081/api/getTransactionsStatusDate/${status}/${sdate}/${edate}`,{
    headers: { Authorization: `${token}` },
  });
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(filterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredData = action.payload;
      })
      .addCase(filterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.data.data;
export const selectFilteredData = (state) => state.data.filteredData;
export const selectDataStatus = (state) => state.data.status;
export const selectDataError = (state) => state.data.error;

export default dataSlice.reducer;