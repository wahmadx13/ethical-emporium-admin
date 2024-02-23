import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import brandServices from "./services";

interface IBrandData {
    title: string;
}

interface IBrandResponse {
    _id: Object;
    title: string,
    createdAt: Date,
    updatedAt: Date,
    statusCode: number;
    message: string;
}

interface IBrandSlice {
    addedBrandData: IBrandResponse;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
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
    addedBrandData: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
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
                state.isSuccess
                state.addedBrandData = action.payload;
            })
            .addCase(createBrand.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedBrandData = action.payload
            })
    }
})

export default brandSlice.reducer