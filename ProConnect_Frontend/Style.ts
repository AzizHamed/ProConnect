import { Context } from "react";
import {
  Typography,
  Colors,
  Spacings,
  Constants,
  ThemeManager,
} from "react-native-ui-lib";
import { Props } from "react-native-ui-lib/src/components/button/ButtonTypes";
import { storeSimpleData, getSimpleData } from "./src/Utility/Storage";

export function initTheme() {
  Colors.loadColors({
    pink: "#FF69B4",
    gold: "#FFD700",
    hadi: "#3cff00",
  });

  Colors.loadDesignTokens({ primaryColor: "#1f1f1f" });

  Colors.loadSchemes({
    light: {
      primary: "#3498db",
      secondary: "#e74c3c",
      tertiary: "#1f2421",
      textPrimary: "#333333",
      textSecondary: "#555555",
      backgroundPrimary: "#ffffff",
      backgroundSecondary: "#f2f2f2",
      backgroundTertiary: "#fafafa",
      success: "#27ae60",
      failure: "#e74c3c",
      highlight: "#cecece",
  },
dark: {
  primary: "#3498db",
  secondary: "#e74c3c",
  tertiary: "#2ecc71",
  textPrimary: "#ecf0f1",
  textSecondary: "#bdc3c7",
  backgroundPrimary: "#34495e",
  backgroundSecondary: "#2c3e50",
  backgroundTertiary: "#2c3e50",
  success: "#27ae60",
  failure: "#e74c3c",
  highlight: "#384f66",
}

    // light: {
    //   primary: "#3498db",
    //   textPrimary: "#333333",
    //   screenBG: "transparent",
    //   textColor: Colors.grey10,
    //   $backgroundSuccess: Colors.green40,
    //   $backgroundSuccessLight: Colors.green70,
    // },
    // dark: {
    //   primary: "#3c5577", // '#f8a4a4',
    //   textPrimary: "#ffffff",
    //   screenBG: "#2e333a",
    //   textColor: Colors.white,
    //   $backgroundSuccess: Colors.green40,
    //   $backgroundSuccessLight: Colors.green20,
    // },
  });

  
  Typography.loadTypographies({
    h1: { fontSize: 42, fontWeight: "heavy", lineHeight: 64 },
    h2: { fontSize: 42, fontWeight: "300", lineHeight: 64 },
    h3: { fontSize: 30, fontWeight: "heavy", lineHeight: 40 },
    h4: { fontSize: 30, fontWeight: "300", lineHeight: 40 },
    body: { fontSize: 16, fontWeight: "400", lineHeight: 18 },
  });

  Spacings.loadSpacings({
    page: Constants.isSmallScreen ? 16 : 24,
    headers: Constants.isSmallScreen ? 10 : 16,
    p: 80,
  });

  ThemeManager.setComponentTheme("Text", (props: Props, context: any) => {
    return {
      h1: props.h1,
      h2: props.h2,
      h3: props.h3,
      body: props.body,
      p: true,
    };
  });

  ThemeManager.setComponentTheme('Button', (props: Props, context: any) => {

    return {
      backgroundColor: Colors.primary,
      text: Colors.moonOrSun
    };
  });

  ThemeManager.setComponentTheme('Card', (props: Props, context: any) => {

    return {
      padding: 10,
      spacing: 30,
    };
  });
}

export function setTheme(dark: boolean) {
  Colors.setScheme(dark ? "dark" : "light");
//   console.log("SetTheme: ", dark ? "Dark" : "Light");
}

const themeStorageKey = "darkTheme";

export async function saveThemePreference(isDarkTheme: boolean) {
  return storeSimpleData(
    themeStorageKey,
    isDarkTheme === undefined ? false : String(isDarkTheme)
  );
}

export async function loadThemePreference() {
  let isDarkTheme = false;
  await getSimpleData(themeStorageKey).then((value) => {
      if (value === undefined) {
          isDarkTheme = false;
        //   console.log("GetSimpleData Value: undefined");
        } else {
            isDarkTheme = value === "true";
            // console.log(`GetSimpleData Value: ${value}`);
        }
    });
return isDarkTheme;
}
