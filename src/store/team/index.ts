import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
//import axios from 'axios';
import { teams as teamsDummy } from '@/dummy';

export interface Team {
  teamId: number;
  teamName: string;
  tagNames: string[];
  captainId: number;
  captainName: string;
  ageGroup: string;
  teamUsers: string[];
}

export interface Teams {
  data: Team[];
  //loading: boolean;
}

export const fetchAllTeam = createAsyncThunk('teams/fetchAllTeam', async () => {
  // const { data } = await axios.get('https://jsonplaceholder.typicode.com/matches');
  // return data;
  return teamsDummy;
});

export const teams = createSlice({
  name: 'teams',
  initialState: {
    data: [],
    //loading: false,
  } as Teams,
  reducers: {},
  extraReducers: {
    [fetchAllTeam.pending.type]: (state: Teams) => {
      state.data = [];
      //state.loading = true;
    },
    [fetchAllTeam.fulfilled.type]: (state: Teams, action: PayloadAction<Team[]>) => {
      state.data.push(...action.payload);
      //state.loading = false;
    },
  },
});
