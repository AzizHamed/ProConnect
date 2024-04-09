import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface ChatState {
    ReceiverEmail : string,
    openModal  :boolean
}
const initialState: ChatState = {
 ReceiverEmail : "",
 openModal : false
}

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
       
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.ReceiverEmail = action.payload.ReceiverEmail
            state.openModal = action.payload.openModal
        },
    },
    selectors:{
        getSelectedChatEmail: (state) =>{
            return state.ReceiverEmail
        },

        getSelectedChatModal: (state) =>{
            return state.openModal
        },
        
    },
})

export const { setChat } = ChatSlice.actions
export const { getSelectedChatEmail, getSelectedChatModal } = ChatSlice.selectors
export default ChatSlice.reducer
