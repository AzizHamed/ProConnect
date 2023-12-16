require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import {  StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  initTheme,
  setTheme,
  saveThemePreference,
  loadThemePreference,
} from "./Style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Testing from "./src/Components/Testing";
import JobsList from "./src/Features/Jobs/JobsList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobPage from "./src/Features/Jobs/JobPage";
import { Provider } from "react-redux";
import { store } from "./src/Services/Store";

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
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer key={isDarkTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={JobsList} />
            <Stack.Screen name="Testing">
              {(props) => (
                <Testing toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
                )}
            </Stack.Screen>
                <Stack.Screen name="Job" component={JobPage} />
            {/* <Stack.Screen name="Job">
          {(props) => <JobPage job={props}/>} 
        </Stack.Screen> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});
