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
export type TextProps = {
  h1?: boolean,
  h2?: boolean,
  h3?: boolean,
  h4?: boolean,
  h4l?: boolean,
  h5?: boolean,
  t2?: boolean,
}
export type ViewProps = {
  invisible?: boolean,
}

export function initTheme() {


  Colors.loadDesignTokens({ primaryColor: "#1f1f1f" });

  Colors.loadSchemes({
    light: {
      primary: "#3498db",
      secondary: "#e74c3c",
      tertiary: "#1f2421",
      textPrimary: "#333333",
      textSecondary: "#555555",
      backgroundPrimary: "#f0f0f0",
      backgroundSecondary: "#d5dbe0",
      backgroundTertiary: "#d5dbe0",
      backgroundDark: "#313131",
      controlBackground: "#414141",
      controlBackgroundDisabled: "#a1a1a1",
      controlText: "#d5dbe0",
      radioColorSelected: "#414141",
      radioColorDeselected: "#555555",
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
      backgroundDark: "#20303c",
      controlBackground: "#4b6e91",
      controlBackgroundDisabled: "#707070",
      controlText: "#d5e0d6",
      radioColorSelected: "#d5e0d6",
      radioColorDeselected: "#4b6e91",
      success: "#27ae60",
      failure: "#f37964",
      highlight: "#384f66",
  }
  });

  
  Typography.loadTypographies({
    h1: { fontSize: 42, fontWeight: "heavy", lineHeight: 64 },
    h2: { fontSize: 42, fontWeight: "300", lineHeight: 64 },
    h3: { fontSize: 30, fontWeight: "heavy", lineHeight: 40 },
    h4: { fontSize: 30, fontWeight: "heavy", lineHeight: 40 },
    h4l: { fontSize: 30, fontWeight: "300", lineHeight: 40 },
    h5: { fontSize: 12, fontWeight: "heavy", lineHeight: 32 },
    body: { fontSize: 18, fontWeight: "400", lineHeight: 18 },
    bold: { fontWeight: "600" },
  });

  Spacings.loadSpacings({
    page: Constants.isSmallScreen ? 16 : 24,
    headers: Constants.isSmallScreen ? 10 : 16,
    paragraphMargin: 16,
    p: 80,
  });

  ThemeManager.setComponentTheme("View", (props: Props & ViewProps, context: any) => {
    return {
      backgroundColor: getViewColor(props)
    };
  });

  ThemeManager.setComponentTheme("Text", (props: Props & TextProps, context: any) => {
    return {
      h1: props.h1,
      h2: props.h2,
      h3: props.h3,
      h4: props.h4,
      h5: props.h5,
      h4l: props.h4l,
      body: !isHeader(props),
      "marginV-5": true,
      color: (props.t2 !== undefined && props.t2) ? Colors.textSecondary : Colors.textPrimary
    };
  });

  ThemeManager.setComponentTheme('Button', (props: Props, context: any) => {

    return {
      backgroundColor: Colors.backgroundSecondary,
      color: Colors.textPrimary,
      center: true,
      "marginV-10": true
    };
  });
  ThemeManager.setComponentTheme('Switch', (props: Props, context: any) => {

    return {
      onColor: Colors.controlText,
      offColor: Colors.backgroundTertiary,
      thumbColor: Colors.controlBackground,
      height: 30,
      thumbSize: 25,
      "margin-15": true
    };
  });

  ThemeManager.setComponentTheme('Card', (props: Props, context: any) => {

    return {
      padding: 10,
      spacing: 30,
      backgroundColor: Colors.backgroundSecondary,
      "margin-20": true,
    };
  });
  ThemeManager.setComponentTheme('LoaderScreen', (props: Props, context: any) => {

    return {
      padding: 20,
      margins: 20,
      loaderColor: Colors.secondary,
      messageStyle: {color: Colors.textPrimary}
    };
  });

  function isHeader(props: Props & TextProps)
  {
    return props.h1 || props.h2 || props.h3 || props.h4;
  }

  function getViewColor(props: Props & ViewProps)
  {
    if(props.invisible) return Colors.transparent;
    return props.bg ? Colors.backgroundPrimary : Colors.backgroundSecondary;
  }
}

export function setTheme(dark: boolean) {
  Colors.setScheme(dark ? "dark" : "light");
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
          isDarkTheme = true;
        } else {
            isDarkTheme = value === "true";
        }
    });
  return isDarkTheme;
}
