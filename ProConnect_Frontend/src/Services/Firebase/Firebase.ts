import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, initializeAuth, 
        getReactNativePersistence, browserLocalPersistence, // This shows an error but works for some reason
        createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile, updateEmail, updatePhoneNumber } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAlCHhoL3JTmOp2l-0D2cp2vS2uuTJKiys",
  authDomain: "proconnect-6173c.firebaseapp.com",
  projectId: "proconnect-6173c",
  storageBucket: "proconnect-6173c.appspot.com",
  messagingSenderId: "429902246683",
  appId: "1:429902246683:web:ff3d77dbfa6b884bc9d9be",
  measurementId: "G-DP6PW6YH41"
};

const isWeb: boolean = Platform.OS === "web";

// Initialize Firebase
const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(config);
  }
};

const noActiveApps = !getApps().length;
const FIREBASE_APP = noActiveApps ? createFirebaseApp(firebaseConfig) : getApp(); 
// Create an auth instance
export const webAuth = noActiveApps 
? initializeAuth(FIREBASE_APP,  { persistence: isWeb ? browserLocalPersistence : getReactNativePersistence(ReactNativeAsyncStorage) }) // Save login state
: getAuth(FIREBASE_APP); // If there's already an auth instance running, use that instead (fixes bug with Android hot reload).

// export const analyticsEvent = (eventName:string, params?: { [key: string]: any; } | undefined) => {
//   isWeb ? logEvent(webAnalytics, eventName, params) : nativeAnalytics.logEvent(eventName, params)
// }

export const emailSignUp = (email:string, password:string) => {
  return createUserWithEmailAndPassword(webAuth, email, password)
}

export const emailSignIn = (email:string, password:string) => {
  return signInWithEmailAndPassword(webAuth, email, password)
}

export const emailSignOut = () => {
  return signOut(webAuth)
}

export const sendResetPasswordEmail = (email: string) => {
  return sendPasswordResetEmail(webAuth, email);
}

export const updateUserProfile = (displayName: string, photoURL:string) => {
  if(webAuth.currentUser !== null){
    return updateProfile(webAuth.currentUser, {
      displayName: displayName, photoURL: photoURL
    });
  }
  else {
    console.log("No logged in user")
    return null;
  }
}

export const updateUserEmail = (email: string) => {
  if(webAuth.currentUser !== null){
    return updateEmail(webAuth.currentUser, email);
  }
  else {
    console.log("No logged in user")
    return null;
  }
}

export const firebaseUser = webAuth.currentUser;


///Firestore beginning

export const database = getFirestore();

export const auth = getAuth();