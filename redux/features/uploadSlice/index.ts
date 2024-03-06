import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import uploadServices from "./services";

interface IProductSlice {
    imageData: any;
    uploadLoading: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
};

export const uploadImages = createAsyncThunk(
    'upload/upload-images',
    async ({ imageData, jwtToken, targetId, path }: { imageData: File[], jwtToken: string, targetId: string, path: string }, thunkApi) => {
        console.log('image data in slice', imageData)
        try {
            return await uploadServices.uploadTargetImages(imageData, jwtToken, targetId, path);
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
    uploadLoading: false,
    uploadSuccess: false,
    uploadError: false,
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
                state.uploadLoading = true;
                state.uploadError = false;
                state.uploadSuccess = false;
            })
            .addCase(uploadImages.fulfilled, (state, action: PayloadAction<any>) => {
                state.uploadLoading = false;
                state.uploadSuccess = true;
                state.uploadError = false;
                state.imageData = action.payload;
            })
            .addCase(uploadImages.rejected, (state, action: PayloadAction<any>) => {
                state.uploadLoading = false;
                state.uploadSuccess = false;
                state.uploadError = true;
                state.imageData = action.payload;
            })
    }
})

export default uploadSlice.reducer;

