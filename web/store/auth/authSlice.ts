import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
    token: string;
    userId: string;
    loading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: "",
    userId: "",
    loading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authorize: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
        },
        deauthorize: (state) => {
            state.isAuthenticated = false;
            state.token = "";
            state.userId = "";
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { authorize, deauthorize } = authSlice.actions;

export default authSlice.reducer;
