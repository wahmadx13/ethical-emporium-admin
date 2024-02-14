import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authServices from "./services";
import { ILoginProps } from "../../../types/signin";


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
    try {
        return await authServices.loginAdmin(user)
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
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
                console.log('payload', action.payload)
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload;
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

