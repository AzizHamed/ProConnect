import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";
import { Job, User } from "../Api";
import { getSelectedJob } from "./JobSlice";

export interface ChatState {
    ReceiverEmail : string,
    openModal  :boolean,
    receiverUserName : String;
    receiverPhotoUrl? : String;
    receiverUser ?: User;
    job ?:Job
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
            state.receiverUser = action.payload.receiverUser
            state.job = action.payload.job
        },
    },
    selectors:{
        getSelectedChatEmail: (state) =>{
            return state.ReceiverEmail
        },

        getSelectedChatModal: (state) =>{
            return state.openModal
        },
        getReceiverPhotoUrl: (state) =>{
            return state.receiverPhotoUrl;
        },
        getSelectedReceiverUserName: (state) =>{
            return state.receiverUserName
        },
        getSelectedReceiverUser : (state) =>{
            return state.receiverUser
        },
        getSelectedJob1  : (state) =>{
            return state.job
        }
        
    },
})

export const { setChat } = ChatSlice.actions
export const { getReceiverPhotoUrl, getSelectedChatEmail, getSelectedChatModal, getSelectedReceiverUserName, getSelectedReceiverUser, getSelectedJob1 } = ChatSlice.selectors
export default ChatSlice.reducer
