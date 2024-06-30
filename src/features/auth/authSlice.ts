import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: { username: string } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { token },
            }: PayloadAction<{ token: string }>,
        ) => {
            state.isAuthenticated = true;
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        },
        setTokenFromStorage: (
            state,
            { payload: token }: PayloadAction<string | null>,
        ) => {
            if (token) {
                state.isAuthenticated = true;
                state.token = token;
            }
        },
    },
});

export const { setCredentials, logout, setTokenFromStorage } =
    authSlice.actions;

export default authSlice.reducer;
