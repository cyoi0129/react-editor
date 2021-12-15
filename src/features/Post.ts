import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { masterItem, postList } from './types';
import basicData from '../data.json';
import { fetchData } from '../app/firebase';

const initialState: postList = {
  posts: []
}

export const getPostList = createAsyncThunk(
  'post/getPostList',
    async () => {
      const response = await fetchData('post');
      return response;
    }
);

export const addPost = createAsyncThunk(
  'post/addPost',
  async (newCateogry: string) => {
    const response = await fetch( basicData.env.local + '/post/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newCateogry),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (targetPost: masterItem) => {
    const response = await fetch( basicData.env.local + '/post/' + String(targetPost.id) + '/' , {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(targetPost),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const removePost = createAsyncThunk(
  'post/removePost',
  async (targetPost: masterItem) => {
    const response = await fetch( basicData.env.local + '/post/' + String(targetPost.id) + '/' , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(targetPost),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    });
    // Error Block
    builder.addCase(getPostList.pending, () => {
      // Error process
    });
    builder.addCase(getPostList.rejected, () => {
      // Error process
    });
    builder.addCase(addPost.pending, () => {
      // Error process
    });
    builder.addCase(addPost.rejected, () => {
      // Error process
    });
    builder.addCase(updatePost.pending, () => {
      // Error process
    });
    builder.addCase(updatePost.rejected, () => {
      // Error process
    });
    builder.addCase(removePost.pending, () => {
      // Error process
    });
    builder.addCase(removePost.rejected, () => {
      // Error process
    });
  }
});

export default postSlice.reducer;
export const selectPost = (state: RootState) => state.posts;
export const selectPostByID = createSelector(
  (state: RootState) => state.posts,
  (state: RootState, postID: number) => postID,
  (posts, postID) => posts.posts.find(post => post.id === postID),
)