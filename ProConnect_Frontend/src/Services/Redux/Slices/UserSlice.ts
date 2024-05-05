import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../Api";

export interface UserInitialState {
    users: User[],
    selectedUser: User | null
}
const initialState: UserInitialState = {
    users: [],
    selectedUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        selectUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser =  action.payload
        }
    },
    selectors:{
        getSelectedUser: (state) =>{
            return state.selectedUser;
        }
    },
})

export const { selectUser } = userSlice.actions
export const { getSelectedUser } = userSlice.selectors
export default userSlice.reducer
