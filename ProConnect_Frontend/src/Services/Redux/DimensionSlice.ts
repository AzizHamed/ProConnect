import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dimensions, ScaledSize } from "react-native"

export interface DimensionInitialState {
    sceen: ScaledSize,
    window: ScaledSize,
}
const initialState: DimensionInitialState = {
    sceen: Dimensions.get("screen"),
    window: Dimensions.get("window"),
}

export const dimensionSlice = createSlice({
    name: 'dimension',
    initialState,
    reducers: {
        setDimensions: (state, action: PayloadAction<DimensionInitialState>) => {
            state.sceen = action.payload.sceen;
            state.window = action.payload.window;
        }
    },
    selectors:{
        getWindowWidth: (state) => {
            return state.window.width;
        },
        getWindowHeight: (state) => {
            return state.window.height;
        },
        getScreenWidth: (state) => {
            return state.sceen.width;
        },
        getScreenHeight: (state) => {
            return state.sceen.height;
        },
    },
})

export const { setDimensions } = dimensionSlice.actions
export const { getWindowWidth, getWindowHeight, getScreenHeight, getScreenWidth } = dimensionSlice.selectors
export default dimensionSlice.reducer
