import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import ProButton from '../../Components/Controls/ProButton';
import { GoogleProvider, emailSignIn, emailSignOut, emailSignUp, firebaseUser, googleSignin, webAuth } from '../../Services/Firebase/Firebase';
import { useGetAuthUser } from '../../Services/Firebase/useGetAuthUser';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextField from '../../Components/Controls/ProTextField';

const EmailPasswordLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const user = useGetAuthUser(webAuth);
  const handleLogin = async () => {

    googleSignin().then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  function createLoginForm()
  {
    return <View backgroundColor={Colors.backgroundPrimary}>
      <Text marginR-10>{username || "None"}</Text>
      <ProTextField></ProTextField>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)} />
      <ProButton marginH-50 marginV-10 text="Email Login" onPress={emailSignin} />
      <ProButton marginH-50 marginV-10 text="Signup" onPress={emailSignup} />
      <ProButton marginH-50 marginV-10 text="Google" onPress={handleLogin} />
      <ProButton marginH-50 marginV-10 text="Log Out" onPress={emailSignout} />
    </View>;
  }
  
const emailSignup = async () => {emailSignUp(email, password).then(user=>{setUsername(user.user.email + " Created!"||"Null")}).catch(error=>{setUsername(error.message)})}
const emailSignin = async () => {emailSignIn(email, password).then(user=>{setUsername(user.user.email + " Logged In!"||"Null")}).catch(error=>{setUsername(error.message)})}
const emailSignout = async () => {emailSignOut()}

  return (
    <BackgroundView children={createLoginForm()}></BackgroundView>
  );
};

export default EmailPasswordLoginScreen;
