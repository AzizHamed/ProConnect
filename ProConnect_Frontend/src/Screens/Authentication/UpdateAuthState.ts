import {
  UserDetails,
  setUserCredential,
} from "../../Services/Redux/Slices/AuthSlice";
import { User as FBUser, onAuthStateChanged } from "firebase/auth";
import { webAuth } from "../../Services/Firebase/Firebase";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigationProp } from "@react-navigation/native";

export function updateAuthState(user: FBUser | null,
  dispatch: Dispatch<UnknownAction>,
  navigation?: NavigationProp<ReactNavigation.RootParamList>,
  updateAction?: (user: FBUser)=> void) {

  if (user !== null && user !== undefined) {
    user?.getIdToken().then((idToken: any) => {
        const userDetails: UserDetails = {
          email: user?.email || "",
          name: user?.displayName || "",
          phone: user?.phoneNumber || "",
          idToken: idToken,
          uid: user?.uid,
          photoURL: user?.photoURL || "",
        };
        console.log(user, userDetails);
        dispatch(setUserCredential(userDetails));
        if(updateAction !== undefined)
          updateAction(user);
        if(navigation)
          navigateToMainStack(navigation);
      })
      .catch((error: any) => {
        console.log("Error getting id token of user", error);
        dispatch(setUserCredential({}));
      });
  } else {
    // Handle the case when user is null or undefined
    // throw new Error("User is null or undefined!");
  }
}

export function setupAuthStateListener(setIsLoadingAuthState: (val: boolean) => void, dispatch: any, navigation: any) {
  const onAuthChanged = onAuthStateChanged(webAuth, (user) => {
    updateAuthState(user, dispatch, navigation);
    setIsLoadingAuthState(false);
  });
  return () => {
    onAuthChanged();
  };
}

export function navigateToMainStack(navigation: any) {
  navigation.reset({
    index: 0,
    routes: [{ name: "Main" }],
  });
}
