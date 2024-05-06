import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";
import { Job, User } from "../Api";
import { getSelectedJob } from "./JobSlice";

export interface PersonChatState {
   enterToCode : boolean
}
const initialState: PersonChatState = {
 enterToCode : true
}

export const PersonChatSlice = createSlice({
    name: 'PersonChat',
    initialState,
    reducers: {
       
        setPersonChat: (state, action: PayloadAction<PersonChatState>) => {
            state.enterToCode = action.payload.enterToCode
            
        },
    },
    selectors:{
     getSelectedEnterToCode: (state) =>{
          return state.enterToCode
     }

        
    },
})

export const { setPersonChat } = PersonChatSlice.actions
export const { getSelectedEnterToCode } = PersonChatSlice.selectors
export default PersonChatSlice.reducer
