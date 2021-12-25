import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fileList } from '../app/types';
import { fetchFileList, uploadFile } from '../app/firebase';

const initialState: fileList = {
  files: []
}

export const getFileList = createAsyncThunk(
  'file/getFileList',
  async () => {
    const response = await fetchFileList();
    return response;
  }
);

export const addFileItem = createAsyncThunk(
  'file/addFileItem',
  async (file: File) => {
    const response = await uploadFile(file);
    return response;
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFileList.fulfilled, (state, action) => {
      state.files = action.payload;
    });
    builder.addCase(addFileItem.fulfilled, (state, action) => {
    state.files = state.files.filter(file => file.name !== action.payload.name);
    state.files = [...state.files, action.payload];
    });
  }
});

export default fileSlice.reducer;
export const selectFile = (state: RootState) => state.files;