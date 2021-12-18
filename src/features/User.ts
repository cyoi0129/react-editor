import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { userStatus } from '../app/types';
import { userAuth } from '../app/firebase';
import Cookies from 'js-cookie';

const initialState: userStatus = {
    isLogined: false,
    email: '',
    password: ''
}

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (user: userStatus) => {
        const response = await userAuth(user);
        return user;
    }
);

export const userUpdate = createAsyncThunk(
    'user/userUpdate',
    async (user: userStatus) => {
        const response = await userAuth(user);
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateLogin: (state) => {
            state.isLogined = true;
        },
        userLogout: (state) => {
            state.isLogined = false;
            Cookies.set('isLogined', '0');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLogined = true;
            Cookies.set('isLogined', '1', { expires: 90 });
        });
        builder.addCase(userUpdate.fulfilled, (state, action) => {
            // if (action.payload.target === 'users/categories') {
            //     state.categories = action.payload.data;
            // } else {
            //     state.tags = action.payload.data;
            // }
        });
        // Error Block
        builder.addCase(userLogin.pending, () => {
            // Error process
        });
        builder.addCase(userLogin.rejected, () => {
            // Error process
        });
        builder.addCase(userUpdate.pending, () => {
            // Error process
        });
        builder.addCase(userUpdate.rejected, () => {
            // Error process
        });
    }
});

export default userSlice.reducer;
export const { updateLogin, userLogout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;