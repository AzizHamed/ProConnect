import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface SortByState {
    sortBy : string
}
const initialState: SortByState = {
 sortBy : "0",
}

export const SortBySlice = createSlice({
    name: 'SortBy',
    initialState,
    reducers: {
       
        setSortBy: (state, action: PayloadAction<SortByState>) => {
            state.sortBy = action.payload.sortBy
        },
    },
    selectors:{
        getSortBy: (state) =>{
            return state.sortBy
        },
        
    },
})

export const { setSortBy } = SortBySlice.actions
export const { getSortBy } = SortBySlice.selectors
export default SortBySlice.reducer
