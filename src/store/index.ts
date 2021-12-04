import { configureStore } from '@reduxjs/toolkit';
import { matches } from './match';
import { teams } from './team';

export const store = configureStore({
  reducer: {
    matches: matches.reducer,
    teams: teams.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
