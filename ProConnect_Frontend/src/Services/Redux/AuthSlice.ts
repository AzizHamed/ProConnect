import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  userCredential: any;
}


  

const initialState: AuthState = {
  userCredential: undefined 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserCredential:  (state, action: PayloadAction<AuthState>)=>{
      state.userCredential = action.payload;
    }
  },
  selectors: {
    getUserCredential: (state) => {
      return state.userCredential;
    },
  },
});

export const { } = authSlice.actions;
export const { getUserCredential } = authSlice.selectors;
export default authSlice.reducer;
