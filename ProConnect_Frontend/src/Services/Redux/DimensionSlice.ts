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
        getWindow: (state) => {
            return state.window;
        },
        getWindowWidth: (state) => {
            return state.window.width;
        },
        getWindowHeight: (state) => {
            return state.window.height;
        },
        getScreen: (state) => {
            return state.sceen;
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
export const { getWindow, getWindowWidth, getWindowHeight, getScreen, getScreenHeight, getScreenWidth } = dimensionSlice.selectors
export default dimensionSlice.reducer
