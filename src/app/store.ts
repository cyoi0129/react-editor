import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import masterReducer from '../features/Master';
import fileReducer from '../features/File';
import userReducer from '../features/User';
import postReducer from '../features/Post';

export const store = configureStore({
  reducer: {
    user: userReducer,
    masters: masterReducer,
    posts: postReducer,
    files: fileReducer
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
