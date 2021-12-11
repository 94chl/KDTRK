/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserData, userDummy, userDummy2 } from '@/dummyMatch';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (token: number) => {
  return userDummy.data;
});

interface UserState {
  data: {
    user: User;
  };
}

export const user = createSlice({
  name: 'user',
  initialState: {
    data: {
      user: {},
    },
  } as UserState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.fulfilled.type]: (state: UserState, action: PayloadAction<User>) => {
      state.data.user = action.payload;
    },
  },
});
