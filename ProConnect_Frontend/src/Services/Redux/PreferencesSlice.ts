import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Style from "../../../Style";

export interface PreferencesState {
  isDarkTheme: boolean;
}

// Create an async thunk to initialize the state asynchronously
export const initializePreferences = createAsyncThunk(
  'preferences/initialize',
  async () => {
    const isDarkTheme = await Style.loadThemePreference();
    Style.setTheme(isDarkTheme);
    return { isDarkTheme };
  }
);

export const changeTheme = createAsyncThunk(
    'preferences/changeTheme',
    async (isDarkTheme: boolean) => {
        await Style.saveThemePreference(isDarkTheme);
        Style.setTheme(isDarkTheme);
        return { isDarkTheme };
    }
);

export const toggleTheme = createAsyncThunk(
    'preferences/toggleTheme',
    async (_, { getState, dispatch }) => {
      const { isDarkTheme } = (getState() as { preferences: PreferencesState }).preferences;
      const newTheme = !isDarkTheme;
      await dispatch(changeTheme(newTheme));
      return { isDarkTheme: newTheme };
    }
  );
  

const initialState: PreferencesState = {
  isDarkTheme: false, // Default value until the async initialization is complete
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(initializePreferences.fulfilled, (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    })
    .addCase(changeTheme.fulfilled, (state, action) => {
        state.isDarkTheme = action.payload.isDarkTheme;
    });
  },
  selectors: {
    isDarkTheme: (state) => {
      return state.isDarkTheme;
    },
  },
});

function updateTheme(isDarkTheme:boolean) {
    Style.saveThemePreference(isDarkTheme).then(() => {
      Style.setTheme(isDarkTheme);
    });
}
export const { } = preferencesSlice.actions;
export const { isDarkTheme } = preferencesSlice.selectors;
export default preferencesSlice.reducer;
