import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login, currentAuthUser } from "./services";

interface IAuthInitialState {
    user: any;
    orders: [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: any;
}

interface IUser { }

const initialState: IAuthInitialState = {
    user: null,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true
                state.message = action.error;
            })
            .addCase(currentAuthUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(currentAuthUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload;
            })
            .addCase(currentAuthUser.rejected, (state, action) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.message = action.error
            })
    }
})

export default authSlice.reducer;

