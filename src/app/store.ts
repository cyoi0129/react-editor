import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import masterReducer from '../features/Master';
import userReducer from '../features/User';
import postReducer from '../features/Post';

export const store = configureStore({
  reducer: {
    user: userReducer,
    masters: masterReducer,
    posts: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
