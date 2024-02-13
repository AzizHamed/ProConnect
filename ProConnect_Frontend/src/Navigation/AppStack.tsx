import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import ProfileEditorScreen from "../Screens/Profile/ProfileEditorScreen";

const AppStack = createNativeStackNavigator();

export const AppStackScreen: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Auth" component={AuthStackScreen}/>
        <AppStack.Screen name="Main" component={MainDrawerScreen} />

   </AppStack.Navigator>
  );
};