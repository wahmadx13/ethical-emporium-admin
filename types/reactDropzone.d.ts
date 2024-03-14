import { ActionCreatorWithoutPayload, AsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

export interface IReactDropzoneProps {
    resetState?: ActionCreatorWithoutPayload<'Reset_all'>;
    targetId?: string;
    uploadImages: AsyncThunk<
        any,
        { imageData: File[]; jwtToken: string; targetId: string; path: string },
        AsyncThunkConfig
    >;
    jwtToken: string;
    path: string;
    isLoading: boolean;
    setTargetId?: Dispatch<SetStateAction<string>>;
    setEditImage?: any;
}