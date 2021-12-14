import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { masterItem, tagList } from './types';
import basicData from '../data.json';
import { fetchData } from '../app/firebase';

const initialState: tagList = {
  tags: []
}

export const getTagList = createAsyncThunk(
  'tag/getTagList',
    async () => {
    //   const response = await fetch( basicData.env.local + '/tag/', {
    //     method: 'GET',
    //     credentials: 'include',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //   }).then((res) => res.json());
      const response = await fetchData('master/tag');
      return response;
    }
);

export const addTag = createAsyncThunk(
  'tag/addTag',
  async (newCateogry: string) => {
    const response = await fetch( basicData.env.local + '/tag/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newCateogry),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const editTag = createAsyncThunk(
  'tag/editTag',
  async (targetTag: masterItem) => {
    const response = await fetch( basicData.env.local + '/tag/' + String(targetTag.id) + '/' , {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(targetTag),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const removeTag = createAsyncThunk(
  'tag/removeTag',
  async (targetTag: masterItem) => {
    const response = await fetch( basicData.env.local + '/tag/' + String(targetTag.id) + '/' , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(targetTag),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

const tagSlice = createSlice({
  name: 'tag',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTagList.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.tags = [...state.tags, action.payload];
    });
    builder.addCase(editTag.fulfilled, (state, action) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload.id);
      state.tags = [...state.tags, action.payload];
    });
    builder.addCase(removeTag.fulfilled, (state, action) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload.id);
    });
    // Error Block
    builder.addCase(getTagList.pending, () => {
      // Error process
    });
    builder.addCase(getTagList.rejected, () => {
      // Error process
    });
    builder.addCase(addTag.pending, () => {
      // Error process
    });
    builder.addCase(addTag.rejected, () => {
      // Error process
    });
    builder.addCase(editTag.pending, () => {
      // Error process
    });
    builder.addCase(editTag.rejected, () => {
      // Error process
    });
    builder.addCase(removeTag.pending, () => {
      // Error process
    });
    builder.addCase(removeTag.rejected, () => {
      // Error process
    });
  }
});

export default tagSlice.reducer;
export const selectTag = (state: RootState) => state.tags;
export const selectTagByID = createSelector(
  (state: RootState) => state.tags,
  (state: RootState, tagID: number) => tagID,
  (tags, tagID) => tags.tags.find(tag => tag.id === tagID),
)
export const selectTagByName = createSelector(
  (state: RootState) => state.tags,
  (state: RootState, cateogryName: string) => cateogryName,
  (tags, tagName) => tags.tags.find(tag => tag.name === tagName),
)