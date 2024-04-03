import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer,  } from "@react-navigation/native";
import { initializePreferences,  isDarkTheme } from "./Services/Redux/Slices/PreferencesSlice";
import { setDimensions } from "./Services/Redux/Slices/DimensionSlice";
import { AppDispatch } from "./Services/Redux/Store";
import { AppStackScreen } from "./Navigation/AppStack";
import { useViewport } from "./Hooks/useViewPort";


const Index: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkTheme = useSelector(isDarkTheme);

  useEffect(() => {
    dispatch(initializePreferences());
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        dispatch(setDimensions({ screen: screen, window: window }));
      }
    );
    return () => subscription?.remove();
  }, []);

  return (
      <NavigationContainer key={darkTheme.toString()}>
        <AppStackScreen/>
      </NavigationContainer>
  );
};

export default Index;