/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import {
  Matches,
  matches as matchesDummy,
  MatchTypes,
  MatchDetail,
  match as matchDummy,
  TeamWithUser,
  teamWithUser as teamWithUserDummy,
} from '@/dummyMatch';

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatch', async () => {
  return matchesDummy;
});

export const fetchMatchById = createAsyncThunk('matches/fetchMatchById', async (id: number) => {
  return matchDummy;
});

export const deleteMatchById = createAsyncThunk(
  `matches/deleteMatchById`,
  async (matchId: number) => {
    return { matchId };
  }
);

export const fetchTeamWithUser = createAsyncThunk(
  'matches/fetchTeamWithUser',
  async (token: number) => {
    return teamWithUserDummy;
  }
);

export const matches = createSlice({
  name: 'matches',
  initialState: {
    data: {
      matches: [],
      match: [],
      teamWithUser: [],
    },
  } as MatchTypes,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: MatchTypes) => {
      state.data.matches = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: MatchTypes, action: PayloadAction<Matches>) => {
      state.data.matches.push(...action.payload.data.matches);
    },
    [fetchMatchById.fulfilled.type]: (state: MatchTypes, action: PayloadAction<MatchDetail>) => {
      state.data.match = [];
      state.data.match.push(action.payload.data);
    },
    [deleteMatchById.fulfilled.type]: (state: MatchTypes) => {
      state.data.match = [];
    },
    [fetchTeamWithUser.fulfilled.type]: (
      state: MatchTypes,
      action: PayloadAction<TeamWithUser>
    ) => {
      state.data.teamWithUser = [];
      state.data.teamWithUser.push(...action.payload.data.teams);
    },
  },
});
