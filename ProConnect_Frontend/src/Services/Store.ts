import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../Features/Jobs/JobSlice";
import DimensionReducer from "./Redux/DimensionSlice";
import PreferencesReducer, { initializePreferences } from "./Redux/PreferencesSlice";

export const store = configureStore({
    reducer: {
        job: JobReducer,
        dimension: DimensionReducer,
        preferences: PreferencesReducer
    }
})

store.dispatch(initializePreferences());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
