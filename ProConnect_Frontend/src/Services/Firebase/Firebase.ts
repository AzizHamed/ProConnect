import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, initializeAuth, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile, updateEmail } from "firebase/auth";
  
// browserLocalPersistence shows an error but works for some reason
// @ts-ignore
import { getReactNativePersistence, browserLocalPersistence} from 'firebase/auth' 
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

import { Platform } from "react-native";
import { SelectedFile } from "../../Constants/Types";
import { User } from "../Redux/Api";
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


// ---------------------- AUTH ----------------------

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
  
  
  // -------------------- END AUTH --------------------
  
  
  
  
  // -------------------- STORAGE ---------------------
  
  export const storage = getStorage(FIREBASE_APP);
  
  export const listFiles = async (path: string) => {
    const storageRef = ref(storage, path);
    const list = await listAll(storageRef);
    console.log(list.items)
    return list.items;
  }
  
  const uploadToFirebase = async (uri: string, uploadPath: string, name: string, onProgress:(progress: number) => void)
  : Promise<{downloadUrl: string; metadata: any;}> => {
    const blob = await uriToBlob(uri);
    const imageRef = ref(getStorage(), `${uploadPath}/${name}`);
    
    const uploadTask = uploadBytesResumable(imageRef, blob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
        );
      });
    };
    
    export async function uploadSelectedFiles(uploadPath: string, selectedFiles: SelectedFile[], user: User) {
      const promises = Array.from(selectedFiles).map(async (file) => {
        const uploadResp = await uploadToFirebase(
      file.uri,
      uploadPath + '/' + user?.id,
      file.fileName,
      (onProgress) => console.log(onProgress)
      );
      
      // console.log(uploadResp, uploadResp.downloadUrl);
      return uploadResp.downloadUrl;
    });
    
    const urls: string[] = await Promise.all(promises);
    return urls;
  }
  /**
   * Function to convert a URI to a Blob object
   * @param {string} uri - The URI of the file
   * @returns {Promise} - Returns a promise that resolves with the Blob object
  */
 function uriToBlob(uri: string): Promise<Blob> {
   return new Promise((resolve, reject) => {
     const xhr = new XMLHttpRequest();
     
     // If successful -> return with blob
     xhr.onload = function () {
       resolve(xhr.response);
      };
      
      // reject on error
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      
      // Set the response type to 'blob' - this means the server's response 
    // will be accessed as a binary object
    xhr.responseType = 'blob';
    
    // Initialize the request. The third argument set to 'true' denotes 
    // that the request is asynchronous
    xhr.open('GET', uri, true);
    
    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
};


// ------------------ END STORAGE -------------------



export const firebaseUser = webAuth.currentUser;


///Firestore beginning

export const database = getFirestore();

export const auth = getAuth();
