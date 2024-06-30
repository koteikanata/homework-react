import { configureStore } from '@reduxjs/toolkit';
import { filmsApi } from '../features/api/filmsApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [filmsApi.reducerPath]: filmsApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
