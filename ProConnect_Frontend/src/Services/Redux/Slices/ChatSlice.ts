import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface ChatState {
    ReceiverEmail : string
}
const initialState: ChatState = {
 ReceiverEmail : ""
}

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
       
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.ReceiverEmail = action.payload.ReceiverEmail
        },
    },
    selectors:{
        getSelectedChat: (state) =>{
            return state.ReceiverEmail
        },
        
    },
})

export const { setChat } = ChatSlice.actions
export const { getSelectedChat } = ChatSlice.selectors
export default ChatSlice.reducer
