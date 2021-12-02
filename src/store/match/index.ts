import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Match {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Matches {
  data: Match[];
  loading: boolean;
}

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatch', async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/matches');
  return data;
});

export const fetchMatchById = createAsyncThunk('matches/fetchMatchById', async (id: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/matches/${id}`);
  return data;
});

export const deleteMatchById = createAsyncThunk(`matches/deleteMatchById`, async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/matches/${id}`);
  return { id };
});

export const matches = createSlice({
  name: 'matches',
  initialState: {
    data: [],
    loading: false,
  } as Matches,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: Matches) => {
      state.data = [];
      state.loading = true;
    },
    [fetchAllMatch.fulfilled.type]: (state: Matches, action: PayloadAction<Match[]>) => {
      state.data.push(...action.payload);
      state.loading = false;
    },
    [fetchMatchById.fulfilled.type]: (state: Matches, action: PayloadAction<Match>) => {
      const index = state.data.findIndex((match) => match.id === action.payload.id);
      if (index === -1) {
        state.data.push(action.payload);
      } else {
        state.data[index] = action.payload;
      }
    },
    [deleteMatchById.fulfilled.type]: (
      state: Matches,
      action: PayloadAction<Pick<Match, 'id'>>
    ) => {
      const index = state.data.findIndex((match) => match.id === action.payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});
