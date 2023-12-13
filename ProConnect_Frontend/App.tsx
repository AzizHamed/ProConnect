require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { ScrollView, StyleSheet } from "react-native";
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
import JobsList from "./src/Components/Jobs/JobsList";
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
    saveThemePreference(isDarkTheme).then(() => {
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
      <View paddingT-page paddingL-page bg-backgroundPrimary>
        <Text h1 textPrimary>
          {isDarkTheme ? "Dark Mode" : "Light Mode"}
        </Text>
      </View>
      <JobsList></JobsList>
      {/* <Testing toggleTheme={toggleTheme} /> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  }
});
