import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface PersonsPageState {
    ComponentType : "ProButton" | "Rating"
}
const initialState: PersonsPageState = {
 ComponentType : "ProButton"
}

export const PersonsSlice = createSlice({
    name: 'PersonsPage',
    initialState,
    reducers: {
       
        setPersonsPage: (state, action: PayloadAction<PersonsPageState>) => {
            state.ComponentType = action.payload.ComponentType
        },
    },
    selectors:{
        getSelectedPersonsPage: (state) =>{
            return state.ComponentType
        },
        
    },
})

export const { setPersonsPage } = PersonsSlice.actions
export const { getSelectedPersonsPage } = PersonsSlice.selectors
export default PersonsSlice.reducer
