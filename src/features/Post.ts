import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { postList, postItem, postData, dbPostItem } from './types';
import { convertPost, post2DB, mapPostItem } from '../app/utils';
import { fetchData, updatePost, removePost, addPost } from '../app/firebase';

const initialState: postList = {
  posts: []
}

export const getPostList = createAsyncThunk(
  'post/getPostList',
  async () => {
    const response = await fetchData('posts');
    return response;
  }
);

export const updatePostItem = createAsyncThunk(
  'post/updatePostItem',
  async (post: postItem) => {
    const postData: dbPostItem = post2DB(post);
    const response = await updatePost(postData);
    const result = mapPostItem(post.id, response);
    return result;
  }
);

export const addPostItem = createAsyncThunk(
  'post/addPostItem',
  async (post: postData) => {
    const response = await addPost(post);
    const result = mapPostItem(response.id as string, response.data);
    return result;
  }
);

export const removePostItem = createAsyncThunk(
  'post/removePostItem',
  async (targetPostID: string) => {
    const response = await removePost(targetPostID);
    return response;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.fulfilled, (state, action) => {
      const result = convertPost(action.payload);
      state.posts = result;
    });
    builder.addCase(updatePostItem.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(addPostItem.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(removePostItem.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    });
    // Error Block
    builder.addCase(getPostList.pending, () => {
      // Error process
    });
    builder.addCase(getPostList.rejected, () => {
      // Error process
    });
    builder.addCase(addPostItem.pending, () => {
      // Error process
    });
    builder.addCase(addPostItem.rejected, () => {
      // Error process
    });
    builder.addCase(updatePostItem.pending, () => {
      // Error process
    });
    builder.addCase(updatePostItem.rejected, () => {
      // Error process
    });
    builder.addCase(removePostItem.pending, () => {
      // Error process
    });
    builder.addCase(removePostItem.rejected, () => {
      // Error process
    });
  }
});

export default postSlice.reducer;
export const selectPost = (state: RootState) => state.posts;
export const selectPostByID = createSelector(
  (state: RootState) => state.posts,
  (state: RootState, postID: string) => postID,
  (posts, postID) => posts.posts.find(post => post.id === postID),
)