import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
//import axios from 'axios';
import { matches as matchesDummy } from '@/dummy';

export interface Match {
  matchId: number; // 매치 id
  registerTeamId: number; // 등록팀 id
  applyTeamId: number | null; // 수락완료 신청팀 id(nullable). null일 시 매칭 전
  sports: string;
  city: string;
  region: string;
  groundName: string;
  date: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  status: string;
  cost: number;
  detail: string;
  isCancelled: boolean;
  created_date: string;
  modified_date: string;

  // 수락 전 매치 신청한 팀 목록? -> 매치 신청팀 리스트 조회 API 사용
  // 참가 팀원은? 유저 매치 기록API
  // players: [userId, userId, userId]
}

export interface Matches {
  data: Match[];
  //loading: boolean;
}

export const fetchAllMatch = createAsyncThunk('matches/fetchAllMatch', async () => {
  // const { data } = await axios.get('https://jsonplaceholder.typicode.com/matches');
  // return data;
  return matchesDummy;
});

export const matches = createSlice({
  name: 'matches',
  initialState: {
    data: [],
    //loading: false,
  } as Matches,
  reducers: {},
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: Matches) => {
      state.data = [];
      //state.loading = true;
    },
    [fetchAllMatch.fulfilled.type]: (state: Matches, action: PayloadAction<Match[]>) => {
      state.data.push(...action.payload);
      //state.loading = false;
    },
  },
});
