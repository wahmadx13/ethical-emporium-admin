import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import enquiryServices from "./services";

interface IEnquiryResponse {
    _id: Object;
    name: string,
    email: string;
    mobile?: string;
    comment: string;
    status: string;
    createdAt: Date,
    updatedAt: Date,
    statusCode?: number;
    message?: string;
};

interface IEnquirySlice {
    enquiry: IEnquiryResponse;
    allEnquiries: IEnquiryResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Enquiries
export const getAllEnquiries = createAsyncThunk(
    'enquiry/get-all-enquiries',
    async (_, thunkApi) => {
        try {
            return await enquiryServices.getEnquiries()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Resetting States
export const resetEnquiryState = createAction("Reset_all");

const initialState: IEnquirySlice = {
    enquiry: null,
    allEnquiries: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const enquirySlice = createSlice({
    name: 'enquiry',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all enquiries
            .addCase(getAllEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllEnquiries.fulfilled, (state, action: PayloadAction<IEnquirySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.allEnquiries = action.payload;
            })
            .addCase(getAllEnquiries.rejected, (state, action: PayloadAction<IEnquirySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allEnquiries = action.payload;
            })
            //Case for resetting the states
            .addCase(resetEnquiryState, () => initialState);
    }
})

export default enquirySlice.reducer