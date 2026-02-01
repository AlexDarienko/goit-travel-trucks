import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCamperById = createAsyncThunk(
  'camperDetails/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/${id}`
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message
      );
    }
  }
);

const camperDetailsSlice = createSlice({
  name: 'camperDetails',

  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    resetCamper(state) {
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCamperById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchCamperById.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        fetchCamperById.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetCamper } =
  camperDetailsSlice.actions;

export default camperDetailsSlice.reducer;