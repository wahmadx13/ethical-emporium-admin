import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import brandReducer from '../features/brandSlice';
import productCategoryReducer from '../features/productCategorySlice';
import colorReducer from '../features/colorSlice';
import blogCategoryReducer from '../features/blogCategorySlice';
import productReducer from '../features/productSlice';
import blogReducer from '../features/blogSlice';
import uploadReducer from '../features/uploadSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            brandReducer,
            productCategoryReducer,
            colorReducer,
            blogCategoryReducer,
            productReducer,
            blogReducer,
            uploadReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']