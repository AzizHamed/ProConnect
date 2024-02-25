import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import JobsList from "../Features/Jobs/JobsList";
import JobPage from "../Features/Jobs/JobPage";
import PersonsPage from "../Features/Persons/PersonsPage";
import Chat from "../Screens/Chat/Chat";

import {Image, StyleSheet, View,Text} from 'react-native'


const AppStack = createNativeStackNavigator();


export const AppStackScreen: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Auth" component={AuthStackScreen}/>
        <AppStack.Screen name="Main" component={MainDrawerScreen} />

        <AppStack.Screen options={{headerShown: true}}  name="Job" component={JobPage}  />
        <AppStack.Screen name="PersonsPage" component={PersonsPage} />
        <AppStack.Screen name="Chats" component={Chat} options={{headerShown : true, headerTitle: () => (
            <View style={styles.chatHeader}>
                <Image
                source={require('../../gardner2.png')}
                style={{ width: 40, height: 40,  borderRadius : 40}}
              />

              <View>
              <Text>Aziz Hamed</Text>
              <Text> Available</Text>
              </View>
            </View>
            ),}} />

    </AppStack.Navigator>

  );
};

const styles = StyleSheet.create({
  chatHeader : {
    flexDirection : "row",
   justifyContent : "space-between",
   width : 130,
   alignItems : "center",

  },
})