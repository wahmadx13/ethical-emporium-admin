import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import blogServices from "./services";
import { IBlog, IUpdateBlogFieldTypes } from '../../types/blog';

interface IAddBlog extends IBlog {
    _id: Object;
    images?: {
        asset_id: string;
        public_id: string;
        url: string;
    }[];
    numberOfViews: number;
    likes: [];
    dislikes: [];
    author: string;
    statusCode: number;
    message: string;
};

interface IUpdateBlog extends Partial<IUpdateBlogFieldTypes> {
    statusCode: number;
    message: string;
}

interface IBlogSlice extends Partial<IBlog> {
    addedBlog: IAddBlog;
    deletedBlog: any;
    blog: IAddBlog;
    updatedBlog: IUpdateBlog
    allBlogs: IAddBlog[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

//Getting All Blogs
export const getAllBlogs = createAsyncThunk(
    'blog/get-all-blogs',
    async (_, thunkApi) => {
        try {
            return await blogServices.getBlogs()
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Getting A Single Blog
export const getABlog = createAsyncThunk(
    'blog/get-blog',
    async (id: string, thunkApi) => {
        try {
            return await blogServices.getBlog(id)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
);

//Creating A Blog
export const createABlog = createAsyncThunk(
    'blog/create-blog',
    async ({ addBlogData, jwtToken }: { addBlogData: IBlog, jwtToken: string }, thunkApi) => {
        try {
            return await blogServices.createBlog(addBlogData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Updating a Blog
export const updateABlog = createAsyncThunk(
    'blog/update-blog',
    async ({ blogData, jwtToken }: { blogData: IUpdateBlogFieldTypes, jwtToken: string }, thunkApi) => {
        try {
            return await blogServices.updateBlog(blogData, jwtToken);
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
);

//Deleting A Blog
export const deleteABlog = createAsyncThunk(
    'blog/delete-blog',
    async ({ blog, jwtToken }: { blog: { id: Object, imageIds: string[] }, jwtToken: string }, thunkApi) => {
        try {
            return await blogServices.deleteABlog(blog, jwtToken)
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

//Resetting States
export const resetBlogState = createAction("Reset_all");

//Initial State
const initialState: IBlogSlice = {
    addedBlog: null,
    deletedBlog: null,
    blog: null,
    updatedBlog: null,
    allBlogs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

//Blog Slice

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Cases for getting all blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allBlogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.allBlogs = action.payload;
            })
            //Cases for getting a single blog
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getABlog.fulfilled, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.blog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.blog = action.payload;
            })
            //Cases for adding blog
            .addCase(createABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createABlog.fulfilled, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addedBlog = action.payload;
            })
            .addCase(createABlog.rejected, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.addedBlog = action.payload;
            })
            //Cases for updating a blog
            .addCase(updateABlog.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(updateABlog.fulfilled, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.updatedBlog = action.payload;
            })
            .addCase(updateABlog.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.updatedBlog = action.payload;
            })
            //Cases for deleting a blog
            .addCase(deleteABlog.pending, (state) => {
                state.isError = false;
                state.isSuccess = false;
                state.isLoading = true;
            })
            .addCase(deleteABlog.fulfilled, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteABlog.rejected, (state, action: PayloadAction<IBlogSlice | any>) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.deletedBlog = action.payload;
            })
            //Case for resetting the states
            .addCase(resetBlogState, () => initialState);
    }
})

export default blogSlice.reducer;

