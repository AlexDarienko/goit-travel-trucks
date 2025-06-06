import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

// Отримання оголошень із фільтрацією
export const fetchCampers = createAsyncThunk(
  'campers/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const { location, type, options, page } = filters;
      const params = {
        ...(location ? { location } : {}),
        ...(type ? { type } : {}),
        ...(options.ac ? { ac: true } : {}),
        ...(options.kitchen ? { kitchen: true } : {}),
        page,
        limit: 6,
      };
      const response = await axios.get(`${BASE_URL}/campers`, { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Отримання одного кемпера за ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/campers/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);