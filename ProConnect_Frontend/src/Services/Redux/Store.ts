import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import JobReducer from "./Slices/JobSlice";
import DimensionReducer from "./Slices/DimensionSlice";
import PreferencesReducer, { initializePreferences } from "./Slices/PreferencesSlice";
import { api } from "./Api";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        job: JobReducer,
        dimension: DimensionReducer,
        preferences: PreferencesReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

store.dispatch(initializePreferences());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
