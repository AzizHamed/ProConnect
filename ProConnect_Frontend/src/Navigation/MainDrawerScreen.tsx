import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { MainTabScreen } from "./MainTabScreen";
import JobsList from "../Features/Jobs/JobsList";
import Tab from "./OldNav-TabsAndSideBars/Tab";
import ProfileEditorScreen from "../Screens/Profile/ProfileEditorScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import ProfileViewScreen from "../Screens/Profile/ProfileViewScreen";
import { Platform, View } from "react-native";
import { getWindowWidth } from "../Services/Redux/Slices/DimensionSlice";
import { useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';

const MainDrawer = createDrawerNavigator();

export const MainDrawerScreen: React.FC = () => {
  const currentWindowWidth = useSelector(getWindowWidth);

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
        },
        headerLeft: ( tintColor?: string | undefined, pressColor?: string | undefined, pressOpacity?: number | undefined )=>{
          return isWeb(currentWindowWidth) 
          ? <></> 
          : <View>
              <DrawerToggleButton></DrawerToggleButton>
          </View>;
        },
        drawerType: getDrawerType(currentWindowWidth),
      }}>
      {/* <MainDrawer.Screen name="MainTabs" component={Tab} /> */}
      <MainDrawer.Screen name="MainTabs" options={{drawerLabel: "Home"}} component={MainTabScreen} />
      <MainDrawer.Screen name="Settings" component={SettingsScreen} />
      <MainDrawer.Screen name="Profile" component={ProfileViewScreen}/>
      <MainDrawer.Screen name="ProfileEditor" component={ProfileEditorScreen} options={{ drawerItemStyle:{display:"none"} }}/>
    </MainDrawer.Navigator>
  );
};

function getDrawerType(currentWindowWidth: number): "permanent" | "front" | "back" | "slide" | undefined {
  return isWeb(currentWindowWidth) ? "permanent" : "front";
}
function isWeb(currentWindowWidth: number) {
  return Platform.OS === "web" && currentWindowWidth > 720;
}

