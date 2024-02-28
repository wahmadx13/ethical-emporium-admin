import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import brandReducer from '../features/brandSlice';
import productCategoryReducer from '../features/productCategorySlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            brandReducer,
            productCategoryReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']