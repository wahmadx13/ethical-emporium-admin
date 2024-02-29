import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import colorServices from "./services";

interface IColorData {
    title: string;
};

interface IColorUpdate extends IColorData {
    id: string;
}

interface IColorResponse {
    _id: Object;
    title: string,
    createdAt: Date,
    updatedAt: Date,
    statusCode: number;
    message: string;
};

interface IColorSlice {
    addedColorData: IColorResponse;
    color: IColorResponse;
    allColors: IColorResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Colors
export const getAllColors = createAsyncThunk(
    'color/get-all-colors',
    async (_, thunkApi) => {
        try {
            return await colorServices.getColors()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Color
export const getAColor = createAsyncThunk(
    'color/get-color',
    async (id: string, thunkApi) => {
        try {
            return await colorServices.getColor(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Color 
export const createColor = createAsyncThunk(
    'color/create-color',
    async ({ colorData, jwtToken }: { colorData: IColorData, jwtToken: string }, thunkApi) => {
        try {
            return await colorServices.createColor(colorData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating A Color
export const updateAColor = createAsyncThunk(
    'color/update-color',
    async ({ colorData, jwtToken }: { colorData: IColorUpdate, jwtToken: string }, thunkApi) => {
        try {
            return await colorServices.updateColor(colorData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Color
export const deleteAColor = createAsyncThunk(
    'color/delete-color',
    async ({ color, jwtToken }: { color: { id: Object }, jwtToken: string }, thunkApi) => {
        try {
            return await colorServices.deleteColor(color, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Resetting States
export const resetState = createAction("Reset_all");

const initialState: IColorSlice = {
    addedColorData: null,
    color: null,
    allColors: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all colors
            .addCase(getAllColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColors.fulfilled, (state, action: PayloadAction<IColorSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allColors = action.payload;
            })
            .addCase(getAllColors.rejected, (state, action: PayloadAction<IColorSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allColors = action.payload;
            })
            //Cases for getting a single color
            .addCase(getAColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAColor.fulfilled, (state, action: PayloadAction<IColorSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.color = action.payload;
            })
            .addCase(getAColor.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.color = action.payload;
            })
            //Cases for adding a color
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action: PayloadAction<IColorSlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.addedColorData = action.payload;
            })
            .addCase(createColor.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedColorData = action.payload;
            })
            //Cases for updating a color
            .addCase(updateAColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAColor.fulfilled, (state, action: PayloadAction<IColorSlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.color = action.payload;
            })
            .addCase(updateAColor.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.color = action.payload;
            })
            //Cases for color deletion
            .addCase(deleteAColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAColor.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteAColor.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            //Case for resetting the states
            .addCase(resetState, () => initialState);
    }
})

export default colorSlice.reducer