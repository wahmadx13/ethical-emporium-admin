import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import brandServices from "./services";

interface IBrandData {
    title: string;
}

interface IBrand {
    _id: Object;
    title: string,
    createdAt: Date
    updatedAt: Date
}

interface IBrandSlice {
    brands: IBrand[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean,
    message: any;
}

export const createBrand = createAsyncThunk(
    'brand/create-brand',
    async ({ brandData, jwtToken }: { brandData: IBrandData, jwtToken: string }, thunkApi) => {
        try {
            return await brandServices.createBrand(brandData, jwtToken)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

const initialState: IBrandSlice = {
    brands: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action: PayloadAction<IBrandSlice | any>) => {
                state.isLoading = false;
                state.brands = action.payload;
            })
            .addCase(createBrand.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload
            })
    }
})

export default brandSlice.reducer