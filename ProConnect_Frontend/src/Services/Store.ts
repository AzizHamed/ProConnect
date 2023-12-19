import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../Features/Jobs/JobSlice";
import DimensionReducer from "./Redux/DimensionSlice";
import PreferencesReducer, { initializePreferences } from "./Redux/PreferencesSlice";
import { api } from "./Redux/Api";

export const store = configureStore({
    reducer: {
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
