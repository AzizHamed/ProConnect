import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsList from '../../Features/Jobs/JobsList';
import Testing from '../../Components/Testing';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobPage from '../../Features/Jobs/JobPage';
import Index from '../../Index';
import { Colors, Drawer } from 'react-native-ui-lib';
import Drawer1 from './Drawer';
import Search from './Search';
import Search1 from './Search1';

const Tab1 = createBottomTabNavigator();

const Stack = createNativeStackNavigator();



const Tab = () => {
  return (
    <Tab1.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused ,color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'; // Replace with the name of your home icon
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline'; // Replace with the name of your settings icon
            }
            else if(route.name == 'Friends'){
              iconName =  focused ? 'people':'people-outline'
            }

            else if(route.name == 'Post'){
              iconName = focused ? 'share' : 'share-outline'
            }

            

            // You can customize the icon further if needed
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          
          tabBarActiveTintColor: Colors.$backgroundDarkActive, // Color of the active 
          tabBarInactiveTintColor: 'gray', // Color of inactive tabs
          tabBarHideOnKeyboard:"true",
          tabBarStyle: {
            backgroundColor: 'lightgray', // Background color of the tab bar
            borderTopWidth: 1, // Border on top of the tab bar
            borderTopColor: 'gray', // Color of the border on top of the tab bar
          
            
          },
          
          tabBarLabelStyle: {
            fontSize: 14, // Font size of the tab labels
          },
        })}>
    
    <Tab1.Screen name="Home" component={StackNavigator}  options={{ headerShown: false }}  />
    <Tab1.Screen name="Search" component={Search1} options={{headerShown:false}} />
    <Tab1.Screen name="Friends" component={Testing}  options={{headerShown:false}}/>
    <Tab1.Screen name="Post" component={Testing} options={{headerShown:false}} />
   

  </Tab1.Navigator>
  )
}


function StackNavigator () {
  return(
  <Stack.Navigator>
  {/* <Stack.Screen name="Menu" component={Drawer} options={{ headerShown: false }} />
  <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} /> 
   <Stack.Screen name="Menu" component={Drawer1}  options={{ headerShown: false }} />
   */}
  
  
  <Stack.Screen name="Home2" component={JobsList} options={{headerShown:false}} />
  <Stack.Screen name="Testing" component={Testing} options={{headerShown:false}}  />
  <Stack.Screen name="Job" component={JobPage} options={{headerStyle : {
    backgroundColor:Colors.$backgroundElevatedLight

  },
  headerTitleStyle : {
    color:"white"
  },  

  headerTintColor: "white"
  }}  />


  
</Stack.Navigator>
  )
} 

export default Tab
