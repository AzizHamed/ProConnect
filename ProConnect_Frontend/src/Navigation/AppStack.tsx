import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import JobsList from "../Features/Jobs/JobsList";
import JobPage from "../Features/Jobs/JobPage";
import PersonsPage from "../Features/Persons/PersonsPage";
import Chat from "../Screens/Chat/Chat";

import {Image, StyleSheet, View,Text, Dimensions} from 'react-native'
import { Colors } from "react-native-ui-lib";
import { color } from "react-native-elements/dist/helpers";
import FullMapScreen from "../Screens/Chat/FullMapScreen";
import { useSelector } from "react-redux";
import { getSelectedReceiverUserName } from "../Services/Redux/Slices/ChatSlice";


const AppStack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

export const AppStackScreen: React.FC = () => {

  const receiverName = useSelector(getSelectedReceiverUserName)
 

  

 
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Auth" component={AuthStackScreen}/>
        <AppStack.Screen name="Main" component={MainDrawerScreen} />

        <AppStack.Screen options={{headerShown: true}}  name="Job" component={JobPage}  />
        <AppStack.Screen name="PersonsPage" component={PersonsPage} />
        <AppStack.Screen name="Chats" component={Chat} options={{headerShown : true,headerTintColor : "white", headerStyle :styles.header, headerTitle: () => (
          <View style={styles.container}>

            <View style={styles.chatHeader}>
              <Image
              source={require('../../gardner2.png')}
              style={{ width: 40, height: 40,  borderRadius : 40}}
            />
    
            <View style={{width : "87%"}}>
            <Text style={{color : "white"}}>{receiverName}</Text>
            </View>
          </View>
        
          </View>
            ),}} />

            <AppStack.Screen name="FullMapScreen" component={FullMapScreen} options={{headerShown : true,headerTintColor : "white", headerStyle :styles.header}} />

    </AppStack.Navigator>

  );
};

const styles = StyleSheet.create({
  chatHeader : {
    flexDirection : "row",
   justifyContent : "space-between",
   alignItems : "center",
   width : "auto",
  },
  header : {
    backgroundColor : Colors.$backgroundDark,
    },
  container : {

    width : "100%",
    },

})