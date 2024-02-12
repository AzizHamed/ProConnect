import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { MainTabScreen } from "./MainTabScreen";
import JobsList from "../Features/Jobs/JobsList";
import Tab from "./OldNav-TabsAndSideBars/Tab";
import ProfileEditorScreen from "../Screens/Profile/ProfileEditorScreen";
import SettingsScreen from "../Screens/SettingsScreen";

const MainDrawer = createDrawerNavigator();

export const MainDrawerScreen: React.FC = () => {
  return (
    <MainDrawer.Navigator 
    drawerContent={(props) => <CustomDrawerContent {...props}
    state={props.state} navigation={props.navigation} descriptors={props.descriptors}
     />}
     screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250
        },
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
          color:"black"
        },
        drawerLabelStyle: {
          color: "#111"
        }
      }}>
      {/* <MainDrawer.Screen name="MainTabs" component={Tab} /> */}
      <MainDrawer.Screen name="MainTabs" options={{drawerLabel: "Home"}} component={MainTabScreen} />
      <MainDrawer.Screen name="Profile" component={ProfileEditorScreen} />
      <MainDrawer.Screen name="Settings" component={SettingsScreen} />
    </MainDrawer.Navigator>
  );
};