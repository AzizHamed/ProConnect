import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState } from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { MainTabScreen } from "./MainTabScreen";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import SearchTabNavigator from "./SearchTabNavigator";
import ProfileEditorScreen from "../Screens/Profile/ProfileEditorScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import ProfileViewScreen from "../Screens/Profile/ProfileViewScreen";
import { Platform, View } from "react-native";
import { getWindowWidth } from "../Services/Redux/Slices/DimensionSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserAccount } from "../Services/Redux/Slices/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import JobPage from "../Features/Jobs/JobPage";
import { setPersonsPage } from "../Services/Redux/Slices/PersonsPageSlice";

const MainDrawer = createDrawerNavigator();
interface MainDrawerProps {
  role: string
}


export const MainDrawerScreen: React.FC<MainDrawerProps> = (props) => {
  const dataProfessions = [
    { label: 'Carpenter', value: '1' },
    { label: 'Painter', value: '2' },
    { label: 'Constructor', value: '3' },
    { label: 'Pavor', value: '4' },
    { label: 'Electric service', value: '5' },
    { label: 'Security', value: '6' },
    { label: 'Designer', value: '7' },
    { label: 'Garden', value: '8' },
  ]

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const currentWindowWidth = useSelector(getWindowWidth);
  const user = useSelector(getUserAccount);

  if (user === undefined || user === null) {
    //return <BackgroundView children={<ProLoading/>}/>
  }
  else if (user.accountStatus === 'SETUP') {
    return <ProfileEditorScreen></ProfileEditorScreen>
  }

  const backButton = () => { return <Ionicons size={24} style={{ marginLeft: 10 }} name="arrow-back" onPress={navigation.goBack} />; };

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
          color: "black"
        },
        drawerLabelStyle: {
          color: "#111"
        },
        headerLeft: (tintColor?: string | undefined, pressColor?: string | undefined, pressOpacity?: number | undefined) => {
          return isWeb(currentWindowWidth)
            ? <></>
            : <View>
              <DrawerToggleButton></DrawerToggleButton>
            </View>;
        },
        drawerType: getDrawerType(currentWindowWidth),
      }}>
      {/* <MainDrawer.Screen name="MainTabs" component={Tab} /> */}

      <MainDrawer.Screen name="MainTabs" component={MainTabScreen} options={{
        sceneContainerStyle: { overflow: 'hidden' },
        drawerLabel: "Home",
        title: "Home",
        drawerIcon: () => (
          <SimpleLineIcons name="home" size={20} color="#808080" />
        )
      }}

      />

      <MainDrawer.Screen
        name="people"
        options={{
          drawerLabel: "Friends",
          title: "people",
          drawerIcon: () => (
            <Ionicons name="people-outline" size={20} color="#808080" />
          )
        }}
        listeners={{
          drawerItemPress: (e) => {
            dispatch(setPersonsPage({ ComponentType: "ProButton" }))
          }
        }}
        component={SearchTabNavigator}
        initialParams={dataProfessions}

      />
      {/* <MainDrawer.Screen name="test" component={JobsList} /> */}


      <MainDrawer.Screen name="Settings" component={SettingsScreen} options={{

        drawerIcon: () => (
          <Ionicons name="settings-outline" size={20} color="#808080" />
        )
      }} />
      <MainDrawer.Screen name="Profile" component={ProfileViewScreen} options={{title: 'Profile'}}/>
      <MainDrawer.Screen name="ProfileEditor" component={ProfileEditorScreen} options={{ drawerItemStyle: { display: "none" }, title: 'Profile' }} />
      <MainDrawer.Screen name="Job" component={JobPage} options={{ drawerItemStyle: { display: "none" }, headerLeft: backButton }} />
    </MainDrawer.Navigator>
  );
};

function getDrawerType(currentWindowWidth: number): "permanent" | "front" | "back" | "slide" | undefined {
  return isWeb(currentWindowWidth) ? "permanent" : "front";
}
function isWeb(currentWindowWidth: number) {
  return Platform.OS === "web" && currentWindowWidth > 720;
}

