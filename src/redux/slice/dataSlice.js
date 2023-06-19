// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from '../../config/env.config';
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch(backendUrl+'/api/get-transactions/1');
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;