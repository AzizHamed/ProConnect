import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReactElement, ReactNode } from "react";
import { ImageStyle, ViewStyle } from "react-native";

export interface FullMapScreenState {
   latitude : number,
   longitude : number,
}
const initialState: FullMapScreenState = {
  latitude : 0,
  longitude : 0
}

export const FullMapScreenSlice = createSlice({
    name: 'FullMapScreen',
    initialState,
    reducers: {
       
        setFullScreenMap: (state, action: PayloadAction<FullMapScreenState>) => {
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
        },
    },
    selectors:{
        getSelectedLatitude: (state) =>{
            return state.latitude
        },

        getSelectedLongitude: (state) =>{
            return state.longitude
        },
        
    },
})

export const { setFullScreenMap } = FullMapScreenSlice.actions
export const { getSelectedLatitude, getSelectedLongitude } = FullMapScreenSlice.selectors
export default FullMapScreenSlice.reducer
