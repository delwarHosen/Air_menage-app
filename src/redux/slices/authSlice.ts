import { AuthState, AuthUser, Role } from '@/types/authTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: AuthState = {
    token: null,
    user: null,
    role: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: AuthUser }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.user.role ?? null;
            state.isAuthenticated = true;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.role = action.payload.role ?? null;
        },
        setRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload;
            if (state.user) {
                state.user.role = action.payload;
            }
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, setToken, setUser, setRole, clearAuth } =
    authSlice.actions;
export default authSlice.reducer;