import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginProps } from "../../../types/signin";

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

export const currentAuthUser = createAsyncThunk("auth/current-user", async (_, thunkApi) => {
    try {
        const response = await axios.get('api/auth/signin')
        const resp = response.data.data;
        if (resp.status === 200) {
            return resp
        }
    } catch (err) {
        thunkApi.rejectWithValue(err)
    }
})