import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { View, Image, Text } from "react-native-ui-lib";
import { emailSignOut } from "../Services/Firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import { getUserAccount, getUserCredential, setUserCredential } from "../Services/Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ( props ) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUserAccount);
  function renderIcon(props : {focused: boolean, size: number, color: string}) {
    return <MaterialIcons name="logout" size={props.size} color={props.color} />;
  }
  return (
    <DrawerContentScrollView {...props}>
      {/* Your custom drawer header, if needed */}

      <SafeAreaView>
        <View
          style={{
            height: 290,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
        >
          <Image
            source={require("../../R.jpg")}
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              marginVertical: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            { user !== null ? (user?.name.firstName + ' ' + user?.name.lastName) : 'Aziz Hamed' }
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
            }}
          >
           { user?.email || 'Software Engineering'}
          </Text>
        </View>
      </SafeAreaView>

      <DrawerItemList {...props} />
      {/* Add custom drawer items if needed */}
      <DrawerItem
        label="Logout"
        onPress={() => {
          emailSignOut().then(()=>{    
            dispatch(setUserCredential({}));  
            navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });}).catch((error)=>{ console.log(error); })
        }}


        
        // icon={(props : {focused : boolean, size : number, color : string})=>{
        //   return <MaterialIcons name="logout" size={props.size} color={props.color} />;
        // }}

        icon={renderIcon}
      />
    </DrawerContentScrollView>
  );
};
