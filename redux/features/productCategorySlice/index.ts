import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import productCategoryServices from "./services";

interface IProductCategoryData {
    title: string;
};

interface IProductCategoryUpdate extends IProductCategoryData {
    id: string;
}

interface IProductCategoryResponse {
    _id: Object;
    title: string,
    createdAt: Date,
    updatedAt: Date,
    statusCode: number;
    message: string;
};

interface IProductCategorySlice {
    addedProductCategoryData: IProductCategoryResponse;
    productCategory: IProductCategoryResponse;
    allProductCategories: IProductCategoryResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Product Categories
export const getAllProductCategories = createAsyncThunk(
    'product-category/get-all-products-categories',
    async (_, thunkApi) => {
        try {
            return await productCategoryServices.getProductCategories()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Product Category
export const getAProductCategory = createAsyncThunk(
    'product-category/get-product-category',
    async (id: string, thunkApi) => {
        try {
            return await productCategoryServices.getProductCategory(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Product Category 
export const createAProductCategory = createAsyncThunk(
    'product-category/create-product-category',
    async ({ productCategoryData, jwtToken }: { productCategoryData: IProductCategoryData, jwtToken: string }, thunkApi) => {
        try {
            return await productCategoryServices.createProductCategory(productCategoryData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating A Product Category
export const updateAProductCategory = createAsyncThunk(
    'product-category/update-product-category',
    async ({ productCategoryData, jwtToken }: { productCategoryData: IProductCategoryUpdate, jwtToken: string }, thunkApi) => {
        try {
            return await productCategoryServices.updateProductCategory(productCategoryData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Product Category
export const deleteAProductCategory = createAsyncThunk(
    'product-category/delete-product-category',
    async ({ productCategory, jwtToken }: { productCategory: { id: Object }, jwtToken: string }, thunkApi) => {
        try {
            return await productCategoryServices.deleteProductCategory(productCategory, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Resetting States
export const resetState = createAction("Reset_all");

const initialState: IProductCategorySlice = {
    addedProductCategoryData: null,
    productCategory: null,
    allProductCategories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const productCategorySlice = createSlice({
    name: 'product-category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all product categories
            .addCase(getAllProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductCategories.fulfilled, (state, action: PayloadAction<IProductCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allProductCategories = action.payload;
            })
            .addCase(getAllProductCategories.rejected, (state, action: PayloadAction<IProductCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allProductCategories = action.payload;
            })
            //Cases for getting a single product category
            .addCase(getAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProductCategory.fulfilled, (state, action: PayloadAction<IProductCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productCategory = action.payload;
            })
            .addCase(getAProductCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.productCategory = action.payload;
            })
            //Cases for adding a product category
            .addCase(createAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAProductCategory.fulfilled, (state, action: PayloadAction<IProductCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.addedProductCategoryData = action.payload;
            })
            .addCase(createAProductCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedProductCategoryData = action.payload;
            })
            //Cases for updating a product category
            .addCase(updateAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProductCategory.fulfilled, (state, action: PayloadAction<IProductCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.productCategory = action.payload;
            })
            .addCase(updateAProductCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.productCategory = action.payload;
            })
            //Cases for product category deletion
            .addCase(deleteAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProductCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteAProductCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            //Case for resetting the states
            .addCase(resetState, () => initialState);
    }
})

export default productCategorySlice.reducer