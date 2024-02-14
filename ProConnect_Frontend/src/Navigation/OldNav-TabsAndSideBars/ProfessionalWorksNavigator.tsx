import React from 'react'
import { BackHandler, Dimensions, View } from 'react-native'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Testing from '../../Components/Testing';
import { NavigationContainer } from '@react-navigation/native';
import Friends from './Friends';
import PersonsPage from './PersonsPage';

const ProfessionalWorkWith = () => {

  

const Tab = createMaterialTopTabNavigator();

let width =  Dimensions.get('window').width;
//let height =  Dimensions.get('window').height


  return (
    <Tab.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: width / 3 },
      tabBarStyle: { backgroundColor: 'powderblue' },
    }}>
      <Tab.Screen name="HomeOwners" component={PersonsPage} />
      <Tab.Screen name="Contractors" component={PersonsPage} />
      <Tab.Screen name="Workers" component={PersonsPage} />
    </Tab.Navigator>
  )
}

export default ProfessionalWorkWith
