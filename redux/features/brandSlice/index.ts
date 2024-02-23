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
    allBrands: IBrandResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const getAllBrands = createAsyncThunk(
    'brand/get-all-brands',
    async (_, thunkApi) => {
        try {
            return await brandServices.getBrands()
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

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
    allBrands: [],
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
            //Cases for getting all brands
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrands.fulfilled, (state, action: PayloadAction<IBrandSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allBrands = action.payload;
            })
            .addCase(getAllBrands.rejected, (state, action: PayloadAction<IBrandSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allBrands = action.payload
            })
            //Cases for adding a brand
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