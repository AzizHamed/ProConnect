import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import JobsList from "../Features/Jobs/JobsList";
import JobPage from "../Features/Jobs/JobPage";
import PersonsPage from "../Features/Persons/PersonsPage";
import Chat from "../Screens/Chat/Chat";

import { Image, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Colors } from "react-native-ui-lib";
import { color } from "react-native-elements/dist/helpers";
import FullMapScreen from "../Screens/Chat/FullMapScreen";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedReceiverUserName, getReceiverPhotoUrl, getSelectedReceiverUser, setChat } from "../Services/Redux/Slices/ChatSlice";
import ProButton from "../Components/Controls/ProButton";
import { AirbnbRating } from "react-native-ratings";
import ProfileImage from "../Components/Layout/ProfileImage";
import ProfileEditorScreen from "../Screens/Profile/ProfileEditorScreen";
import { selectUser } from "../Services/Redux/Slices/UserSlice";
import { useNavigation } from "@react-navigation/native";
import ProfileViewScreen from "../Screens/Profile/ProfileViewScreen";


const AppStack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

export const AppStackScreen: React.FC = () => {

  const receiverName = useSelector(getSelectedReceiverUserName);
  const receiverPhotoUrl = useSelector(getReceiverPhotoUrl);
  const user = useSelector(getSelectedReceiverUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Auth" component={AuthStackScreen} />
      <AppStack.Screen name="Main" component={MainDrawerScreen} />
      <AppStack.Screen name="NewUserProfile" component={ProfileEditorScreen} />
      <AppStack.Screen name="OtherUserProfile" component={ProfileViewScreen} options={{headerShown : true, title : "Profile"}} />


        <AppStack.Screen options={{headerShown: true}}  name="Job" component={JobPage}  />
        <AppStack.Screen name="PersonsPage" component={PersonsPage} options={{headerShown : true}}  />
        <AppStack.Screen name="Chats" component={Chat} options={{headerShown : true,headerTintColor : "white", headerStyle :styles.header, headerTitle: () => (
          <View style={styles.container}>

            <View style={styles.chatHeader}>
              <TouchableOpacity onPress={()=>{
              //  
                navigation.navigate("OtherUserProfile");
              }} style={{flexDirection : "row", alignItems : "center"}}>

                <ProfileImage size={40} user={user} />

                <View style={{ width: "87%" , marginLeft : 15}}>
                  <Text style={{ color: "white" }}>{receiverName}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        ), headerRight: () => (
          <View style={{ marginRight: 20 }}>

          </View>
        ),
      }} />

      <AppStack.Screen name="FullMapScreen" component={FullMapScreen} options={{ headerShown: true, headerTintColor: "white", headerStyle: styles.header }} />

    </AppStack.Navigator>

  );
};

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
  },
  header: {
    backgroundColor: Colors.$backgroundDark,
  },
  container: {

    width: "100%",
  },

})