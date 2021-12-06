import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
//import axios from 'axios';
import {
  Matches,
  matches as matchesDummy,
  MatchTypes,
  MatchDetail,
  match as matchDummy,
} from '@/dummy';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatch', async () => {
  // const { data } = await axios.get('https://jsonplaceholder.typicode.com/matches');
  // return data;
  return matchesDummy;
});

export const fetchMatchById = createAsyncThunk('posts/fetchPostById', async (id: number) => {
  // const { data } = await axios.get(
  //   `https://jsonplaceholder.typicode.com/posts/${id}`
  // );
  // return data;
  return matchDummy;
});

export const matches = createSlice({
  name: 'matches',
  initialState: {
    data: {
      matches: [],
      match: [],
    },
  } as MatchTypes,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: MatchTypes) => {
      state.data.matches = [];
      //state.loading = true;
    },
    [fetchAllMatch.fulfilled.type]: (state: MatchTypes, action: PayloadAction<Matches>) => {
      state.data.matches.push(...action.payload.data.matches);
      //state.loading = false;
    },
    [fetchMatchById.fulfilled.type]: (state: MatchTypes, action: PayloadAction<MatchDetail>) => {
      state.data.match.push(action.payload.data);
    },
  },
});
