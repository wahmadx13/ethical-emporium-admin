import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import productServices from "./services";
import { IProduct } from '../../../types/addProduct'

interface IAddProduct extends IProduct {
    _id: Object;
    statusCode: number;
    message: string;
};

interface IUpdateProduct extends IProduct {
    id: string;
};

interface IProductSlice extends Partial<IProduct> {
    addedProduct: IAddProduct;
    product: IAddProduct;
    allProducts: IAddProduct[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Creating A Product
export const createAProduct = createAsyncThunk(
    'product/create-product',
    async ({ addProductData, jwtToken }: { addProductData: IProduct, jwtToken: string }, thunkApi) => {
        try {
            return await productServices.createProduct(addProductData, jwtToken)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Resetting States
export const resetState = createAction("Reset_all");

//Initial State
const initialState: IProductSlice = {
    addedProduct: null,
    product: null,
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
    }
})

export default productSlice.reducer;

