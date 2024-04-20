import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../Screens/Authentication/SignUpScreen";
import SignInScreen from "../Screens/Authentication/SignInScreen";
import ForgotPasswordScreen from "../Screens/Authentication/ForgotPasswordScreen";
import StartupScreen from "../Screens/Authentication/StartupScreen";


const AuthStack = createNativeStackNavigator();

export const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Startup" component={StartupScreen} />
      <AuthStack.Screen name="Login" component={SignInScreen} />
      <AuthStack.Screen name="Signup" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};