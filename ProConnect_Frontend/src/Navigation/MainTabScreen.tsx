import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import SettingsScreen from "../Screens/SettingsScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors, Icon } from "react-native-ui-lib";
import JobsList from "../Features/Jobs/JobsList";
import Friends from "../Screens/Friends/Friends";
import { da } from "date-fns/locale";
import { dataLocation, dataProfessions } from "../Constants/ConstantData";
import PersonsPage from "../Features/Persons/PersonsPage";
import ProButton from "../Components/Controls/ProButton";
import { useDispatch, useSelector } from "react-redux";
import PostJobScreen from "../Features/Jobs/PostJobScreen";
import PersonsChat from "../Screens/Chat/PersonsChat";
import HomePage from "../Screens/HomePage/HomePage";
import { getUserAccount } from "../Services/Redux/Slices/AuthSlice";



export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Search: {label : string , value : string}[];
  Friends: undefined;
  Post: undefined;
  Chat : undefined
  Jobs : undefined
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

export const MainTabScreen: React.FC = () => {

  const user = useSelector(getUserAccount)

  const dispatch = useDispatch();

  // function renderSearchPage(){
  //   return (
    
  //   )
  // }
  return (
    
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; // Replace with the name of your home icon
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble" : "chatbubble-outline"; // Replace with the name of your settings icon
          } else if (route.name == "Friends") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name == "Post") {
            iconName = focused ? "share" : "share-outline";
          }
          else if (route.name == "Jobs") {
            iconName = focused ? "share-social" : "share-social-outline";
          }

          // You can customize the icon further if needed
          return <Ionicons name={iconName} size={size} color={Colors.$backgroundDarkElevated} />;
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
        component={HomePage}
        options={{ headerShown: false }}
      />
       <MainTab.Screen
      name="Chat"
      component={PersonsChat}        
      options={{ headerShown: false }} 

    
      
      
    
    />

    <MainTab.Screen 

    name="Jobs"
    component={JobsList}
    options={{ headerShown: false }} 
    />

      {/* <MainTab.Screen
        name="Friends"
        options={{ headerShown: false }} listeners={{
          tabPress: (e) => {
            dispatch(setPersonsPage({ComponentType : "ProButton"}))
          },
        }}>
          
      {(props) => <PersonsPage   />}

</MainTab.Screen> */}


      <MainTab.Screen
        name="Post"
        component={PostJobScreen}
        options={{ headerShown: false }}
      />
    
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({

  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width:180,
    height:180,
    alignItems:"center",
    justifyContent:"center",
    
  },
  photoStyle : {
    height: 100,
    width: 100,
    borderRadius:70,
    marginBottom:8,
  },



});

