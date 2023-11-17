// store.js

import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});
const authSlice2 = createSlice({
    name: 'auth2',
    initialState: {
        refresh_token: '',
    },
    reducers: {
        setRefreshToken: (state, action) => {
            state.refresh_token = action.payload;
        },
    },
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});
const rootReducer = {
    auth: authSlice.reducer,
    auth2: authSlice2.reducer,
    user: userSlice.reducer,
    // Add other slices as needed
};

// Create a store using configureStore
const store = configureStore({
    reducer: rootReducer,
});

export const { setToken } = authSlice.actions;
export const { setUserData } = userSlice.actions;
export const {setRefreshToken} = authSlice2.actions;

export default store;
