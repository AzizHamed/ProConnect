// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const FIREBASE_APP = isWeb ? createFirebaseApp(firebaseConfig) : getApp();


export const webAuth = initializeAuth(FIREBASE_APP)
// export const userId = () => {isWeb ? webAuth.currentUser?.getIdToken() : nativeAuth.currentUser?.getIdToken();}

// export const analyticsEvent = (eventName:string, params?: { [key: string]: any; } | undefined) => {
//   isWeb ? logEvent(webAnalytics, eventName, params) : nativeAnalytics.logEvent(eventName, params)
// }

export const emailSignUp = (email:string, password:string) => {
  return createUserWithEmailAndPassword(webAuth, email, password)
  // isWeb ? createUserWithEmailAndPassword(webAuth, email, password) : nativeAuth.createUserWithEmailAndPassword(email, password);
}

export const emailSignIn = (email:string, password:string) => {
  return signInWithEmailAndPassword(webAuth, email, password)
  // isWeb ? signInWithEmailAndPassword(webAuth, email, password) : nativeAuth.signInWithEmailAndPassword(email, password);
}

export const emailSignOut = () => {s
  return signOut(webAuth)
  // isWeb ? signOut(webAuth) : nativeAuth.signOut();
}

export const firebaseUser = webAuth.currentUser;

const googleProvider = new GoogleAuthProvider();
export const GoogleProvider = GoogleAuthProvider
export const googleSignin = () => { return signInWithRedirect(webAuth, googleProvider) }