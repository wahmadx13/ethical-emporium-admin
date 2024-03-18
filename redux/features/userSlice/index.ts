import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import userServices from "./services";

interface IUserResponse {
    _id: Object;
    cognitoUserId: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    cart?: {
        _id: string;
        count: number;
        color?: string;
        singleItemPrice: number;
        totalPrice: number;
    }[];
    isBlocked?: boolean;
    wishList?: [];
    cartTotal?: number;
    createdAt: Date;
    updatedAt: Date;
    address?: string;
    statusCode?: number;
    message?: string;
};

//Getting All Users
export const getAllUsers = createAsyncThunk(
    'user/get-all-users',
    async (jwtToken: string, thunkApi) => {
        try {
            return await userServices.getUsers(jwtToken)
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Restrict User Access
export const restrictUser = createAsyncThunk(
    'product/update-product',
    async ({ userData, jwtToken }: { userData: { id: string; isBlocked: boolean }, jwtToken: string }, thunkApi) => {
        try {
            return await userServices.restrictUser(userData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

interface IUserSlice {
    user: IUserResponse;
    allUsers: IUserResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Resetting States
export const resetUserState = createAction("Reset_all");

const initialState: IUserSlice = {
    user: null,
    allUsers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all users
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUserSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false
                state.allUsers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action: PayloadAction<IUserSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allUsers = action.payload;
            })
            //Cases for updating a product
            .addCase(restrictUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(restrictUser.fulfilled, (state, action: PayloadAction<IUserSlice | any>) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload;
            })
            .addCase(restrictUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = action.payload;
            })
            //Case for resetting the states
            .addCase(resetUserState, () => initialState);
    }
})

export default userSlice.reducer