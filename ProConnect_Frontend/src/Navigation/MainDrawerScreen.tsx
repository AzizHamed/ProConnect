import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { MainTabScreen } from "./MainTabScreen";
import JobsList from "../Features/Jobs/JobsList";
import Tab from "./OldNav-TabsAndSideBars/Tab";
import { SimpleLineIcons,Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Search from "./OldNav-TabsAndSideBars/Search";
import ProfessionalWorkWith from "./OldNav-TabsAndSideBars/ProfessionalWorksNavigator";

const MainDrawer = createDrawerNavigator();
interface MainDrawerProps {
  role : string
}


export const MainDrawerScreen: React.FC<MainDrawerProps> = (props) => {
  const dataProfessions = [
    { label: 'Carpetner', value:'1' },
    { label: 'Painter', value: '2' },
    { label: 'Constructor', value: '3' },
    { label: 'Pavor', value: '4' },
    { label: 'Electric service', value: '5' },
    { label: 'Security', value: '6' },
    { label: 'Designer', value: '7' },
    { label: 'Garden', value: '8' },
  ]
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
      <MainDrawer.Screen name="MainTabs" component={MainTabScreen}   options={{
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
            drawerLabel: "Work with me",
            title: "people",
            drawerIcon: () => (
              <Ionicons name="people-outline" size={20} color="#808080" />
            )
          }}
          component={ProfessionalWorkWith}
          initialParams={dataProfessions}
        />
      <MainDrawer.Screen name="test" component={JobsList} />

      

    </MainDrawer.Navigator>
  );
};