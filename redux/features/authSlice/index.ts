import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authServices from "./services";
import { ILoginProps } from "../../../types/signin";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";


interface IAuthInitialState {
    user: any;
    jwtToken?: string;
    firstLogin: boolean;
    orders: [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: any;
}

const initialState: IAuthInitialState = {
    user: null,
    jwtToken: "",
    firstLogin: false,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const login = createAsyncThunk("auth/admin-login", async (user: ILoginProps, thunkApi) => {
    const { email: username, password } = user
    try {
        return await authServices.loginAdmin({ username, password })
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<CognitoIdTokenPayload | null>) => {
            state.user = action.payload;
        },
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.firstLogin = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.isSuccess = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true
                state.firstLogin = false;
                state.message = action.error;
            })
    }
})


export const { setUser, setJwtToken } = authSlice.actions;

export default authSlice.reducer;

