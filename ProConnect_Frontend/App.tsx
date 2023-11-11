require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  initTheme,
  setTheme,
  saveThemePreference,
  loadThemePreference,
} from "./Style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Testing from "./src/Components/Testing";
import { View, Text } from "react-native-ui-lib";
let isDarkTheme: any = undefined;
initTheme();

export default function App() {
  // const users = useGetUsers();
  const [darkTheme, setDarkTheme] = useState<boolean>(isDarkTheme);
  async function loadPreferences() {
    isDarkTheme = await loadThemePreference();
    // console.log("Load await value: ", isDarkTheme);
    updateTheme();
  }
  useEffect(() => {
    loadPreferences();
  }, []);

  function updateTheme() {
    // console.log(`Update Theme: ${isDarkTheme}`);
    saveThemePreference(isDarkTheme).then(() => {
      // console.log(`Saved Theme Pref: ${isDarkTheme}`);
      setTheme(isDarkTheme);
      setTimeout(() => {
        setDarkTheme(isDarkTheme);
      }, 10);
    });
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    updateTheme();
  }

  return (
    <SafeAreaProvider>
      <View padding-page bg-screenBG>
        <Text h1 textColor>
          {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </View>
      <Testing toggleTheme={toggleTheme} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});
