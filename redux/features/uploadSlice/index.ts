import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import uploadServices from "./services";

interface IProductSlice {
    imageData: any;
    deletedProductImages: any;
    imageLoading: boolean;
    imageSuccess: boolean;
    imageError: boolean;
};

//Upload Product Images
export const uploadImages = createAsyncThunk(
    'upload/upload-images',
    async ({ imageData, jwtToken, targetId, path }: { imageData: File[], jwtToken: string, targetId: string, path: string }, thunkApi) => {
        try {
            return await uploadServices.uploadTargetImages(imageData, jwtToken, targetId, path);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Delete Product Images
export const deleteImages = createAsyncThunk(
    'upload/delete-images',
    async ({ imageId, jwtToken, targetId, path }: { imageId: string, jwtToken: string, targetId: string, path: string }, thunkApi) => {
        try {
            return await uploadServices.deleteTargetImages(imageId, jwtToken, targetId, path);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
)

//Resetting States
export const resetUploadState = createAction("Reset_all");

//Initial State
const initialState: IProductSlice = {
    imageData: null,
    deletedProductImages: null,
    imageLoading: false,
    imageSuccess: false,
    imageError: false,
}

//Product Slice

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for upload product images
            .addCase(uploadImages.pending, (state) => {
                state.imageLoading = true;
                state.imageError = false;
                state.imageSuccess = false;
            })
            .addCase(uploadImages.fulfilled, (state, action: PayloadAction<any>) => {
                state.imageLoading = false;
                state.imageSuccess = true;
                state.imageError = false;
                state.imageData = action.payload;
            })
            .addCase(uploadImages.rejected, (state, action: PayloadAction<any>) => {
                state.imageLoading = false;
                state.imageSuccess = false;
                state.imageError = true;
                state.imageData = action.payload;
            })
            //Cases for delete product images
            .addCase(deleteImages.pending, (state) => {
                state.imageLoading = true;
                state.imageError = false;
                state.imageSuccess = false;
            })
            .addCase(deleteImages.fulfilled, (state, action: PayloadAction<any>) => {
                state.imageLoading = false;
                state.imageSuccess = true;
                state.imageError = false;
                state.deletedProductImages = action.payload;
            })
            .addCase(deleteImages.rejected, (state, action: PayloadAction<any>) => {
                state.imageLoading = false;
                state.imageSuccess = false;
                state.imageError = true;
                state.deletedProductImages = action.payload;
            })
    }
})

export default uploadSlice.reducer;

