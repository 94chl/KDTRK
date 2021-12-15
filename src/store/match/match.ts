/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { throwErrorMessage } from '@/utils/api';
import api from '@/api/core';
import {
  MatchCard,
  Match,
  TeamWithUser,
  TeamSimple,
  WaitingTeam,
  TeamMemberEdit,
  MatchListFilter,
  MatchPostEdit,
} from '@/types/match';
import { userTeamDummy } from '@/dummyMatch';

// Todo: API 완성시 추가
export const fetchAllMatch = createAsyncThunk(
  'matches/fetchAllMatches',
  async (filter: MatchListFilter) => {
    const data = await api
      .get({
        url: '/matches',
        params: filter,
      })
      .catch(throwErrorMessage);
    return data.matchList;
  }
);

export const fetchMatchById = createAsyncThunk(
  'matches/fetchMatchById',
  async (matchId: number) => {
    const data = await api
      .get({
        url: `/matches/${matchId}`,
      })
      .catch(throwErrorMessage);
    return data;
  }
);

export const createMatch = createAsyncThunk(
  `matches/createMatch`,
  async (createMatchInfo: Omit<MatchPostEdit, 'matchId'>) => {
    const { sports, ageGroup, city, region, ground, cost, detail, date, startTime, endTime } =
      createMatchInfo;
    const matchInfo = {
      sports,
      ageGroup,
      city,
      region,
      ground,
      cost,
      detail,
      date,
      startTime,
      endTime,
    };

    await api
      .post({
        url: `/matches`,
        data: matchInfo,
      })
      .catch(throwErrorMessage);
  }
);

export const modifyMatch = createAsyncThunk(
  `matches/modifyMatch`,
  async (editedMatchInfo: MatchPostEdit) => {
    const {
      matchId,
      sports,
      ageGroup,
      city,
      region,
      ground,
      cost,
      detail,
      date,
      startTime,
      endTime,
    } = editedMatchInfo;
    const matchInfo = {
      sports,
      ageGroup,
      city,
      region,
      ground,
      cost,
      detail,
      date,
      startTime,
      endTime,
    };

    await api
      .put({
        url: `/matches/${matchId}`,
        data: matchInfo,
      })
      .catch(throwErrorMessage);
  }
);

export const deleteMatchById = createAsyncThunk(
  `matches/deleteMatchById`,
  async (matchId: number) => {
    return { matchId };
  }
);

export const fetchTeamWithUser = createAsyncThunk(
  'match/fetchTeamWithUser',
  async (token: number) => {
    return userTeamDummy;
  }
);

export const fetchWaitingTeams = createAsyncThunk(
  'match/fetchWaitingTeams',
  async (matchId: number) => {
    const data = await api
      .get({
        url: `/matches/${matchId}/waitings`,
      })
      .catch(throwErrorMessage);

    return data.matchWaitingListRespons;
  }
);

export const modifyTeamMember = createAsyncThunk(
  `matches/modifyTeamMember`,
  async (editedTeamMemberInfo: TeamMemberEdit) => {
    const { matchId, players, teamId } = editedTeamMemberInfo;
    const editedTeamMember = {
      teamId,
      players,
    };

    await api
      .put({
        url: `/matches/${matchId}/members`,
        data: editedTeamMember,
      })
      .catch(throwErrorMessage);
  }
);

interface MatchState {
  data: {
    matchList: MatchCard[];
    match: Match[];
    userTeams: TeamSimple[];
    waitingTeams: WaitingTeam[];
    modal: {
      [matchApply: string]: boolean;
      matchApprove: boolean;
      matchReview: boolean;
      matchListFilter: boolean;
      matchTeamMember: boolean;
    };
    matchId: number;
    matchListFilter: MatchListFilter;
  };
}

export const match = createSlice({
  name: 'match',
  initialState: {
    data: {
      matchList: [],
      match: [],
      userTeams: [],
      waitingTeams: [],
      modal: {
        matchApply: false,
        matchApprove: false,
        matchReview: false,
        matchListFilter: false,
        matchTeamMember: false,
      },
      matchId: -1,
      matchListFilter: {
        size: 10,
      },
    },
  } as MatchState,
  reducers: {
    toggleModal: (state, { payload }: PayloadAction<{ modalName: string }>) => {
      state.data.modal[payload.modalName] = !state.data.modal[payload.modalName];
    },
    setMatchId: (state, { payload }: PayloadAction<{ matchId: number }>) => {
      state.data.matchId = payload.matchId;
    },
    setMatchListFilter: (
      state,
      { payload }: PayloadAction<{ matchListFilter: MatchListFilter }>
    ) => {
      state.data.matchListFilter = payload.matchListFilter;
    },
  },
  extraReducers: {
    [fetchAllMatch.pending.type]: (state: MatchState) => {
      state.data.matchList = [];
    },
    [fetchAllMatch.fulfilled.type]: (state: MatchState, action: PayloadAction<MatchCard[]>) => {
      state.data.matchList.push(...action.payload);
    },
    [fetchMatchById.pending.type]: (state: MatchState) => {
      state.data.match = [];
    },
    [fetchMatchById.fulfilled.type]: (state: MatchState, action: PayloadAction<Match>) => {
      state.data.match.push(action.payload);
    },
    [deleteMatchById.fulfilled.type]: (state: MatchState) => {
      state.data.match = [];
    },
    [fetchTeamWithUser.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<TeamWithUser>
    ) => {
      state.data.userTeams = [];
      state.data.userTeams.push(...action.payload.data.teams);
    },
    [fetchWaitingTeams.fulfilled.type]: (
      state: MatchState,
      action: PayloadAction<WaitingTeam[]>
    ) => {
      state.data.waitingTeams = [];
      state.data.waitingTeams.push(...action.payload);
    },
  },
});
