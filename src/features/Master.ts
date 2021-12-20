import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { masterList } from '../app/types';
import { fetchData, updateMaster } from '../app/firebase';

const initialState: masterList = {
    categories: [],
    tags: []
}

export const getMasterList = createAsyncThunk(
    'master/getMasterList',
    async () => {
        const response = await fetchData('masters');
        return response;
    }
);

export const updateMasterList = createAsyncThunk(
    'master/updateMasterList',
    async (updateTarget: { target: string , data: any }) => {
        const response = await updateMaster(updateTarget.target, updateTarget.data);
        return response;
    }
);

const masterSlice = createSlice({
    name: 'master',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMasterList.fulfilled, (state, action) => {
            state.categories = action.payload.categories;
            state.tags = action.payload.tags;
        });
        builder.addCase(updateMasterList.fulfilled, (state, action) => {
            if (action.payload.target === 'masters/categories') {
                state.categories = action.payload.data;
            } else {
                state.tags = action.payload.data;
            }
        });
        // Error Block
        builder.addCase(getMasterList.pending, () => {
            // Error process
        });
        builder.addCase(getMasterList.rejected, () => {
            // Error process
        });
        builder.addCase(updateMasterList.pending, () => {
            // Error process
        });
        builder.addCase(updateMasterList.rejected, () => {
            // Error process
        });
    }
});

export default masterSlice.reducer;
export const selectMaster = (state: RootState) => state.masters;
// export const selectMasterByID = createSelector(
//   (state: RootState) => state.masters,
//   (state: RootState, masterID: number) => masterID,
//   (masters, masterID) => masters.masters.find(master => master.id === masterID),
// )
// export const selectMasterByName = createSelector(
//   (state: RootState) => state.masters,
//   (state: RootState, cateogryName: string) => cateogryName,
//   (masters, masterName) => masters.masters.find(master => master.name === masterName),
// )