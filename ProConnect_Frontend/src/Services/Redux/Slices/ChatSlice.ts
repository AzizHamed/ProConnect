import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";
import { User } from "../Api";

export interface ChatState {
    ReceiverEmail : string,
    openModal  :boolean,
    receiverUserName : String
}
const initialState: ChatState = {
 ReceiverEmail : "",
 openModal : false,
 receiverUserName : "",
}

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
       
        setChat: (state, action: PayloadAction<ChatState>) => {
            state.ReceiverEmail = action.payload.ReceiverEmail
            state.openModal = action.payload.openModal
            state.receiverUserName = action.payload.receiverUserName
        },
    },
    selectors:{
        getSelectedChatEmail: (state) =>{
            return state.ReceiverEmail
        },

        getSelectedChatModal: (state) =>{
            return state.openModal
        },

        getSelectedReceiverUserName: (state) =>{
            return state.receiverUserName
        }
        
    },
})

export const { setChat } = ChatSlice.actions
export const { getSelectedChatEmail, getSelectedChatModal, getSelectedReceiverUserName } = ChatSlice.selectors
export default ChatSlice.reducer
