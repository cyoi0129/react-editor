import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { masterItem, categoryList } from './types';
import basicData from '../data.json';
import { fetchData } from '../app/firebase';

const initialState: categoryList = {
  categories: []
}

export const getCategoryList = createAsyncThunk(
  'category/getCategoryList',
    async () => {
      // const response = await fetch( basicData.env.local + '/category/', {
      //   method: 'GET',
      //   credentials: 'include',
      //   mode: 'cors',
      //   cache: 'no-cache',
      // }).then((res) => res.json());
      const response = await fetchData('master/category');
      return response;
    }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (newCateogry: string) => {
    const response = await fetch( basicData.env.local + '/category/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newCateogry),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async (targetCategory: masterItem) => {
    const response = await fetch( basicData.env.local + '/category/' + String(targetCategory.id) + '/' , {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(targetCategory),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (targetCategory: masterItem) => {
    const response = await fetch( basicData.env.local + '/category/' + String(targetCategory.id) + '/' , {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(targetCategory),
      headers: new Headers({ 'Content-type': 'application/json', 'X-CSRFToken': '' })
    }).then((res) => res.json());
    return response;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload.id);
      state.categories = [...state.categories, action.payload];
    });
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload.id);
    });
    // Error Block
    builder.addCase(getCategoryList.pending, () => {
      // Error process
    });
    builder.addCase(getCategoryList.rejected, () => {
      // Error process
    });
    builder.addCase(addCategory.pending, () => {
      // Error process
    });
    builder.addCase(addCategory.rejected, () => {
      // Error process
    });
    builder.addCase(editCategory.pending, () => {
      // Error process
    });
    builder.addCase(editCategory.rejected, () => {
      // Error process
    });
    builder.addCase(removeCategory.pending, () => {
      // Error process
    });
    builder.addCase(removeCategory.rejected, () => {
      // Error process
    });
  }
});

export default categorySlice.reducer;
export const selectCategory = (state: RootState) => state.categories;
export const selectCategoryByID = createSelector(
  (state: RootState) => state.categories,
  (state: RootState, categoryID: number) => categoryID,
  (categories, categoryID) => categories.categories.find(category => category.id === categoryID),
)
export const selectCategoryByName = createSelector(
  (state: RootState) => state.categories,
  (state: RootState, cateogryName: string) => cateogryName,
  (categories, categoryName) => categories.categories.find(category => category.name === categoryName),
)