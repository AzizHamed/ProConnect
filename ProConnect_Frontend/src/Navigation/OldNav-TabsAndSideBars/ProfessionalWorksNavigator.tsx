import React from 'react'
import { BackHandler, Dimensions, View } from 'react-native'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Testing from '../../Components/Testing';
import { NavigationContainer } from '@react-navigation/native';
import Friends from './Friends';

const ProfessionalWorkWith = () => {

  

const Tab = createMaterialTopTabNavigator();

let width =  Dimensions.get('window').width;
let height =  Dimensions.get('window').height


  return (
    <Tab.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: width / 3 },
      tabBarStyle: { backgroundColor: 'powderblue' },
    }}>
      <Tab.Screen name="HomeOwners" component={Friends} />
      <Tab.Screen name="Contractors" component={Friends} />
      <Tab.Screen name="Workers" component={Friends} />
    </Tab.Navigator>
  )
}

export default ProfessionalWorkWith
