import {
  UserDetails,
  setUserAccount,
  setUserCredential,
} from "../../Services/Redux/Slices/AuthSlice";
import { User as FBUser, onAuthStateChanged } from "firebase/auth";
import { webAuth } from "../../Services/Firebase/Firebase";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { NavigationProp } from "@react-navigation/native";
import { CreateUserApiArg, User, api, useCreateUserMutation, useGetUserQuery } from "../../Services/Redux/Api";

export function updateAuthState(user: FBUser | null,
  dispatch: Dispatch<UnknownAction>,
  navigation?: NavigationProp<ReactNavigation.RootParamList>,
  isNewUser: boolean = false) {

  if (user !== null && user !== undefined) {
    user?.getIdToken(true).then(async (idToken: any) => {
        const userDetails: UserDetails = {
          email: user?.email || "",
          name: user?.displayName || "",
          phone: user?.phoneNumber || "",
          idToken: idToken,
          uid: user?.uid,
          photoURL: user?.photoURL || "",
        };
        // console.log(user, userDetails);
        if(isNewUser){
          await createUser(user, dispatch, navigation);
        }
        dispatch(setUserCredential(userDetails));
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

const createUser = async (user: FBUser, dispatch: any, navigation: any)=>{
  navigateToProfileEditor(navigation);
  console.log('User created')
  const createdUser:CreateUserApiArg = {user: {
    id: user.uid,
    email: user.email || 'Error',
    name:{firstName:user.displayName || 'Error', lastName: ''}}
  };
  const promise = dispatch(api.endpoints.createUser.initiate(createdUser))
  const {data} = await promise;
  dispatch(setUserAccount(data as User));
  // await createUser(createdUser).unwrap().then((res)=>{
  //   console.log(res);
  // }).catch((error)=>{console.log(error)});

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
export function navigateToProfileEditor(navigation: any) {
  navigation.reset({
    index: 0,
    routes: [{ name: "ProfileEditor" }],
  });
}
