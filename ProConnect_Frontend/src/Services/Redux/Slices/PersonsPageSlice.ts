import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface PersonsPageState {
    ComponentType : "ProButton" | "Rating",
    profession : string,
}
const initialState: PersonsPageState = {
 ComponentType : "ProButton",
  profession : ""
}

export const PersonsSlice = createSlice({
    name: 'PersonsPage',
    initialState,
    reducers: {
       
        setPersonsPage: (state, action: PayloadAction<PersonsPageState>) => {
            state.ComponentType = action.payload.ComponentType
            state.profession = action.payload.profession
        },
    },
    selectors:{
        getSelectedPersonsPage: (state) =>{
            return state.ComponentType
        },

        getSelectedProfession : (state) =>{
            return state.profession
        }
        
    },
})

export const { setPersonsPage } = PersonsSlice.actions
export const { getSelectedPersonsPage, getSelectedProfession } = PersonsSlice.selectors
export default PersonsSlice.reducer
