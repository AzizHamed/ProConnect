import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "../Features/Jobs/JobSlice";

export const store = configureStore({
    reducer: {
        job: JobReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
