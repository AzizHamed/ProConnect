import React, { useState } from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import JobsList from '../../Features/Jobs/JobsList';
import Testing from '../Testing';
import { View, Image, Colors,Text} from 'react-native-ui-lib';
import getColors from '../../Constants/Colors';
import DrawerContent from './DrawerContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import Tab from './Tab';
interface DrawerParams {
  headerTitle : string;
}
const Drawer = createDrawerNavigator();


const Drawer1 = () => {

  
 
  return (
  <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <DrawerContent state={props.state} navigation={props.navigation} descriptors={props.descriptors}  />
            )
          }
        }
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
        }}


      >


      
        <Drawer.Screen
          name="Home1"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            )
          }}
          component={Tab}
        />
        <Drawer.Screen
          name="Timer"
          options={{
            drawerLabel: "Timer",
            title: "Timer",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />
        <Drawer.Screen
          name="Categories"
          options={{
            drawerLabel: "Categories",
            title: "Categories",
            drawerIcon: () => (
              <MaterialIcons name="category" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />
        <Drawer.Screen
          name="Customize"
          options={{
            drawerLabel: "Customize",
            title: "Customize",
            drawerIcon: () => (
              <MaterialIcons name="dashboard-customize" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: () => (
              <SimpleLineIcons name="settings" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />

        

        <Drawer.Screen
          name="Get Premium"
          options={{
            drawerLabel: "Get Premuim",
            title: "Get Premium",
            drawerIcon: () => (
              <MaterialCommunityIcons name="certificate" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />
        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />

        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "Contact",
            title: "Contact",
            drawerIcon: () => (
              <MaterialCommunityIcons name="message-alert-outline" size={20} color="#808080" />
            )
          }}
          component={Testing}
        />
      </Drawer.Navigator>
  )
}




export default Drawer1
