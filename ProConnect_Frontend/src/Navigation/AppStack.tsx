import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import JobsList from "../Features/Jobs/JobsList";
import JobPage from "../Features/Jobs/JobPage";
import Testing from "../Components/Testing";
import ProfessionalsPage from "./OldNav-TabsAndSideBars/ProfessionalsPage";


const AppStack = createNativeStackNavigator();

export const AppStackScreen: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Auth" component={AuthStackScreen}/>
        <AppStack.Screen name="Main" component={MainDrawerScreen} />

        <AppStack.Screen options={{headerShown: true}}  name="Job" component={JobPage}  />
        <AppStack.Screen name="Testing" component={Testing}  />
        <AppStack.Screen name="ProfessionalsPage" component={ProfessionalsPage}  />

        



    </AppStack.Navigator>

  );
};