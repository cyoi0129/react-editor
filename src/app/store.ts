import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import masterReducer from '../features/Master';
// import categoryReducer from '../features/Category';
// import tagReducer from '../features/Tag';
import postReducer from '../features/Post';

export const store = configureStore({
  reducer: {
    // categories: categoryReducer,
    // tags: tagReducer,
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
