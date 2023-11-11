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
      primary: "#ce6a6a",
      textPrimary: "#222222",
      screenBG: "transparent",
      textColor: Colors.grey10,
      moonOrSun: Colors.yellow30,
      mountainForeground: Colors.green30,
      mountainBackground: Colors.green50,
      $backgroundSuccess: Colors.green40,
      $backgroundSuccessLight: Colors.green70,
    },
    dark: {
      primary: "#000000", // '#f8a4a4',
      textPrimary: "#ffffff",
      screenBG: "#2e333a",
      textColor: Colors.white,
      moonOrSun: Colors.grey80,
      mountainForeground: Colors.violet10,
      mountainBackground: Colors.violet20,
      $backgroundSuccess: Colors.green40,
      $backgroundSuccessLight: Colors.green20,
    },
  });
  Typography.loadTypographies({
    h1: { fontSize: 42, fontWeight: "heavy", lineHeight: 64 },
    h2: { fontSize: 42, fontWeight: "300", lineHeight: 64 },
    h3: { fontSize: 30, fontWeight: "200", lineHeight: 40 },
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
