import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "redux/store";
import { ILoginProps } from "types/signin";

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

export const login = createAsyncThunk("auth/admin-login", async (user: ILoginProps, thunkApi) => {
    try {
        const response = await axios.post('api/auth/signin', { email: user.email, password: user.password });
        const resp = response.data.data;
        if (resp.status === 200) {
            return resp
        }
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
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
                state.message = action.error
            })
    }
})

export default authSlice.reducer;

