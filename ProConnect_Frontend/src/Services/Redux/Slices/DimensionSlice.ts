import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dimensions, ScaledSize } from "react-native"

export interface DimensionInitialState {
    screen: ScaledSize,
    window: ScaledSize,
}
const initialState: DimensionInitialState = {
    screen: Dimensions.get("screen"),
    window: Dimensions.get("window"),
}

export const dimensionSlice = createSlice({
    name: 'dimension',
    initialState,
    reducers: {
        setDimensions: (state, action: PayloadAction<DimensionInitialState>) => {
            state.screen = action.payload.screen;
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
            return state.screen;
        },
        getScreenWidth: (state) => {
            return state.screen.width;
        },
        getScreenHeight: (state) => {
            return state.screen.height;
        },
    },
})

export const { setDimensions } = dimensionSlice.actions
export const { getWindow, getWindowWidth, getWindowHeight, getScreen, getScreenHeight, getScreenWidth } = dimensionSlice.selectors
export default dimensionSlice.reducer
