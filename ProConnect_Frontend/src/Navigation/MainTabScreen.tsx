import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Testing from "../Components/Testing";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors, Icon } from "react-native-ui-lib";
import Search1 from "./OldNav-TabsAndSideBars/Search1";
import JobsList from "../Features/Jobs/JobsList";

type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Search: undefined;
  Friends: undefined;
  Post: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

export const MainTabScreen: React.FC = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; // Replace with the name of your home icon
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline"; // Replace with the name of your settings icon
          } else if (route.name == "Friends") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name == "Post") {
            iconName = focused ? "share" : "share-outline";
          }

          // You can customize the icon further if needed
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#141414", // Color of the active
        tabBarInactiveTintColor: "gray", // Color of inactive tabs
        tabBarHideOnKeyboard: "true",
        tabBarStyle: {
          backgroundColor: "lightgray", // Background color of the tab bar
          borderTopWidth: 1, // Border on top of the tab bar
          borderTopColor: "gray", // Color of the border on top of the tab bar
        },

        tabBarLabelStyle: {
          fontSize: 14, // Font size of the tab labels
        },
      })}
    >
      <MainTab.Screen
        name="Home"
        component={JobsList}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Search"
        component={Search1}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Friends"
        component={Testing}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Post"
        component={Testing}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
};
