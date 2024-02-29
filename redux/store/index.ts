import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import brandReducer from '../features/brandSlice';
import productCategoryReducer from '../features/productCategorySlice';
import colorReducer from '../features/colorSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            brandReducer,
            productCategoryReducer,
            colorReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']