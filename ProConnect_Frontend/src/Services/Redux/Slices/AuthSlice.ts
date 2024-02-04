import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface UserDetails {
  email?: string | null
  name?: string | null
  phone?: string | null
  idToken?: string | null
  uid?: string | null
  photoURL?: string | null
}

const initialState: UserDetails = {
  email: null,
  name: null,
  phone: null,
  idToken: null,
  uid: null,
  photoURL: null, 
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
      console.log('Arrived in Auth Store', state)
    }
  },
  selectors: {
    getUserCredential: (state) => {
      return state;
    },
  },
});

export const { setUserCredential } = authSlice.actions;
export const { getUserCredential } = authSlice.selectors;
export default authSlice.reducer;
