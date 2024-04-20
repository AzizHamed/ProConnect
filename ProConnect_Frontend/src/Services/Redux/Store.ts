import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import JobReducer from "./Slices/JobSlice";
import PersonsPageReducer from "./Slices/PersonsPageSlice";
import DimensionReducer from "./Slices/DimensionSlice";
import PreferencesReducer, { initializePreferences } from "./Slices/PreferencesSlice";
import { api } from "./Api";
import { fetchUserDataMiddleware } from "./fetchUserDataMiddleware";
import { Dropdown } from "react-native-element-dropdown";
import Chat from "../../Screens/Chat/Chat";

import ChatReducer from "./Slices/ChatSlice";
import SortByReducer from "./Slices/SortBySlice";
export const store = configureStore({
    reducer: {

        auth: AuthReducer,
        chat : ChatReducer,
        job: JobReducer,
        PersonsPage : PersonsPageReducer,
        SortBy : SortByReducer,
        dimension: DimensionReducer,
        preferences: PreferencesReducer,
        [api.reducerPath]: api.reducer
    } as any, 
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)//.concat(fetchUserDataMiddleware)
})

store.dispatch(initializePreferences());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

