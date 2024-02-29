import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import blogCategoryServices from "./services";

interface IBlogCategoryData {
    title: string;
};

interface IBlogCategoryUpdate extends IBlogCategoryData {
    id: string;
}

interface IBlogCategoryResponse {
    _id: Object;
    title: string,
    createdAt: Date,
    updatedAt: Date,
    statusCode: number;
    message: string;
};

interface IBlogCategorySlice {
    addedBlogCategoryData: IBlogCategoryResponse;
    blogCategory: IBlogCategoryResponse;
    allBlogCategories: IBlogCategoryResponse[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Blog Categories
export const getAllBlogCategories = createAsyncThunk(
    'blog-category/get-all-blogs-categories',
    async (_, thunkApi) => {
        try {
            return await blogCategoryServices.getBlogCategories()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Blog Category
export const getABlogCategory = createAsyncThunk(
    'blog-category/get-blog-category',
    async (id: string, thunkApi) => {
        try {
            return await blogCategoryServices.getBlogCategory(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Blog Category 
export const createABlogCategory = createAsyncThunk(
    'blog-category/create-blog-category',
    async ({ blogCategoryData, jwtToken }: { blogCategoryData: IBlogCategoryData, jwtToken: string }, thunkApi) => {
        try {
            return await blogCategoryServices.createBlogCategory(blogCategoryData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating A Blog Category
export const updateABlogCategory = createAsyncThunk(
    'blog-category/update-blog-category',
    async ({ blogCategoryData, jwtToken }: { blogCategoryData: IBlogCategoryUpdate, jwtToken: string }, thunkApi) => {
        try {
            return await blogCategoryServices.updateBlogCategory(blogCategoryData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Blog Category
export const deleteABlogCategory = createAsyncThunk(
    'blog-category/delete-blog-category',
    async ({ blogCategory, jwtToken }: { blogCategory: { id: Object }, jwtToken: string }, thunkApi) => {
        try {
            return await blogCategoryServices.deleteBlogCategory(blogCategory, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Resetting States
export const resetState = createAction("Reset_all");

const initialState: IBlogCategorySlice = {
    addedBlogCategoryData: null,
    blogCategory: null,
    allBlogCategories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const blogCategorySlice = createSlice({
    name: 'blog-category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all blog categories
            .addCase(getAllBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogCategories.fulfilled, (state, action: PayloadAction<IBlogCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allBlogCategories = action.payload;
            })
            .addCase(getAllBlogCategories.rejected, (state, action: PayloadAction<IBlogCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allBlogCategories = action.payload;
            })
            //Cases for getting a single blog category
            .addCase(getABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlogCategory.fulfilled, (state, action: PayloadAction<IBlogCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blogCategory = action.payload;
            })
            .addCase(getABlogCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.blogCategory = action.payload;
            })
            //Cases for adding a blog category
            .addCase(createABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createABlogCategory.fulfilled, (state, action: PayloadAction<IBlogCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.addedBlogCategoryData = action.payload;
            })
            .addCase(createABlogCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedBlogCategoryData = action.payload;
            })
            //Cases for updating a blog category
            .addCase(updateABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlogCategory.fulfilled, (state, action: PayloadAction<IBlogCategorySlice | any>) => {
                state.isLoading = false;
                state.isSuccess
                state.blogCategory = action.payload;
            })
            .addCase(updateABlogCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.blogCategory = action.payload;
            })
            //Cases for blog category deletion
            .addCase(deleteABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteABlogCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteABlogCategory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            //Case for resetting the states
            .addCase(resetState, () => initialState);
    }
})

export default blogCategorySlice.reducer