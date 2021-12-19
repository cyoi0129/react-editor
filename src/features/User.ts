import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { userLoginData, userStatus } from '../app/types';
import { userAuth, fetchUserData } from '../app/firebase';
import Cookies from 'js-cookie';

const initialState: userStatus = {
    isLogined: false,
    userLogin: {
        email: '',
        password: ''
    },
    userInfo: {
        displayName: null,
        email: null,
        uid: null,
        refreshToken: null,
        photoURL: null
    }
}

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (user: userLoginData) => {
        const response = await userAuth(user);
        return response;
    }
);

export const getUserData = createAsyncThunk(
    'user/getUserData',
    async () => {
        const response = await fetchUserData();
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userLogout: (state) => {
            state.isLogined = false;
            state.userInfo = {
                displayName: null,
                email: null,
                uid: null,
                refreshToken: null,
                photoURL: null
            }
            Cookies.set('isLogined', '0');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLogined = true;
            state.userLogin.email = '';
            state.userLogin.password = '';
            state.userInfo = action.payload;
            Cookies.set('isLogined', '1', { expires: 90 });
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.isLogined = true;
            state.userInfo = action.payload;
        });
        // Error Block
        builder.addCase(userLogin.pending, () => {
            // Error process
        });
        builder.addCase(userLogin.rejected, () => {
            // Error process
        });
        builder.addCase(getUserData.pending, () => {
            // Error process
        });
        builder.addCase(getUserData.rejected, () => {
            // Error process
        });
    }
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;