import { configureStore } from '@reduxjs/toolkit';
import { posts } from './posts/posts';
import { match } from './match/match';
import { user } from './user/user';

export const store = configureStore({
  reducer: {
    posts: posts.reducer,
    match: match.reducer,
    user: user.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
