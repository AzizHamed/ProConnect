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
import { View, Text, Colors } from "react-native-ui-lib";
import JobsList from "./src/Components/Jobs/JobsList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobPage from "./src/Components/Jobs/JobPage";

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

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer key={isDarkTheme}>
        <Stack.Navigator> 
        <Stack.Screen name="Home" component={JobsList} />
        <Stack.Screen name="Testing">
          {(props) => <Testing toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/>} 
        </Stack.Screen>
        {/* <Stack.Screen name="Job">
          {(props) => <JobPage job={props}/>} 
        </Stack.Screen> */}
        </Stack.Navigator>
      
      </NavigationContainer>
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
