import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../Api";

export interface UserDetails {
  email?: string | null
  name?: string | null
  phone?: string | null
  idToken?: string | null
  uid?: string | null
  photoURL?: string | null
  user?: User | null | undefined
}

const initialState: UserDetails = {
  email: null,
  name: null,
  phone: null,
  idToken: null,
  uid: null,
  photoURL: null, 
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserCredential:  (state, action: PayloadAction<UserDetails>)=>{
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    setUserAccount: (state, action: PayloadAction<User>)=>{
      state.user = action.payload;
    }
  },
  selectors: {
    getUserCredential: (state) => {
      return state;
    },
    getUserAccount: (state) => {
      return state.user;
    }
  },
});

export const { setUserCredential, setUserAccount } = authSlice.actions;
export const { getUserCredential, getUserAccount } = authSlice.selectors;
export default authSlice.reducer;
