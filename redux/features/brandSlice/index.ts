import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import brandServices from "./services";

interface IBrandData {
    title: string;
};

interface IBrandUpdate extends IBrandData {
    id: string;
}

interface IBrandResponse {
    _id: Object;
    title: string,
    createdAt: Date,
    updatedAt: Date,
    statusCode: number;
    message: string;
};

interface IBrandSlice {
    addedBrandData: IBrandResponse;
    brand: IBrandResponse;
    allBrands: IBrandResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Brands
export const getAllBrands = createAsyncThunk(
    'brand/get-all-brands',
    async (_, thunkApi) => {
        try {
            return await brandServices.getBrands()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Brand
export const getABrand = createAsyncThunk(
    'brand/get-brand',
    async (id: string, thunkApi) => {
        try {
            return await brandServices.getBrand(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Brand 
export const createBrand = createAsyncThunk(
    'brand/create-brand',
    async ({ brandData, jwtToken }: { brandData: IBrandData, jwtToken: string }, thunkApi) => {
        try {
            return await brandServices.createBrand(brandData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating A Brand
export const updateABrand = createAsyncThunk(
    'brand/update-brand',
    async ({ brandData, jwtToken }: { brandData: IBrandUpdate, jwtToken: string }, thunkApi) => {
        try {
            return await brandServices.updateBrand(brandData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Brand
export const deleteABrand = createAsyncThunk(
    'brand/delete-brand',
    async ({ brand, jwtToken }: { brand: { id: Object }, jwtToken: string }, thunkApi) => {
        try {
            return await brandServices.deleteBrand(brand, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Resetting States
export const resetState = createAction("Reset_all");

const initialState: IBrandSlice = {
    addedBrandData: null,
    brand: null,
    allBrands: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

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
                state.allBrands = action.payload;
            })
            //Cases for getting a single brand
            .addCase(getABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABrand.fulfilled, (state, action: PayloadAction<IBrandSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.brand = action.payload;
            })
            .addCase(getABrand.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.brand = action.payload;
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
                state.addedBrandData = action.payload;
            })
            //Cases for updating a brand
            .addCase(updateABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABrand.fulfilled, (state, action: PayloadAction<IBrandSlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.brand = action.payload;
            })
            .addCase(updateABrand.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.brand = action.payload;
            })
            //Cases for brand deletion
            .addCase(deleteABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteABrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteABrand.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            //Case for resetting the states
            .addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer