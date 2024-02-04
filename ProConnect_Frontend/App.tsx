require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import { StyleSheet } from "react-native";
import React from "react";
import {  initTheme } from "./Style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/Services/Redux/Store";
import Index from "./src/Index";

initTheme();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Index/>
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
