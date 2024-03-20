import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import productServices from "./services";
import { IProduct } from '../../../types/addProduct'
import { IUpdateProductFieldTypes } from "../../types/product";

interface IAddProduct extends IProduct {
    _id: Object;
    images?: {
        asset_id: string;
        public_id: string;
        url: string;
    }[];
    ratings: any;
    totalRating?: number;
    sold: number;
    featured: boolean;
    trending: boolean;
    newArrival: boolean;
    statusCode: number;
    message: string;
};

interface IUpdateProduct extends Partial<IUpdateProductFieldTypes> {
    statusCode: number;
    message: string;
}

interface IProductSlice extends Partial<IProduct> {
    addedProduct: IAddProduct;
    deletedProduct: any;
    product: IAddProduct;
    updatedProduct: IUpdateProduct
    allProducts: IAddProduct[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Products
export const getAllProducts = createAsyncThunk(
    'product/get-all-products',
    async (_, thunkApi) => {
        try {
            return await productServices.getProducts()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Product
export const getAProduct = createAsyncThunk(
    'product/get-product',
    async (id: string, thunkApi) => {
        try {
            return await productServices.getProduct(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Product
export const createAProduct = createAsyncThunk(
    'product/create-product',
    async ({ addProductData, jwtToken }: { addProductData: IProduct, jwtToken: string }, thunkApi) => {
        try {
            return await productServices.createProduct(addProductData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating a product
export const updateAProduct = createAsyncThunk(
    'product/update-product',
    async ({ projectData, jwtToken }: { projectData: IUpdateProductFieldTypes, jwtToken: string }, thunkApi) => {
        try {
            return await productServices.updateProduct(projectData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Product
export const deleteAProduct = createAsyncThunk(
    'product/delete-product',
    async ({ product, jwtToken }: { product: { id: Object, imageIds: string[] }, jwtToken: string }, thunkApi) => {
        try {
            return await productServices.deleteAProduct(product, jwtToken)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

//Resetting States
export const resetProductState = createAction("Reset_all");

//Initial State
const initialState: IProductSlice = {
    addedProduct: null,
    deletedProduct: null,
    product: null,
    updatedProduct: null,
    allProducts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

//Product Slice

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all products
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allProducts = action.payload;
            })
            //Cases for getting a single product
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAProduct.fulfilled, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.product = action.payload;
            })
            //Cases for adding product
            .addCase(createAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAProduct.fulfilled, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addedProduct = action.payload;
            })
            .addCase(createAProduct.rejected, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedProduct = action.payload;
            })
            //Cases for updating a product
            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(updateAProduct.fulfilled, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.updatedProduct = action.payload;
            })
            .addCase(updateAProduct.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.updatedProduct = action.payload;
            })
            //Cases for deleting a product
            .addCase(deleteAProduct.pending, (state) => {
                state.isError = false;
                state.isSuccess = false;
                state.isLoading = true;
            })
            .addCase(deleteAProduct.fulfilled, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteAProduct.rejected, (state, action: PayloadAction<IProductSlice | any>) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.deletedProduct = action.payload;
            })
            //Case for resetting the states
            .addCase(resetProductState, () => initialState);
    }
})

export default productSlice.reducer;

