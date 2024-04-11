import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import ProTextInput from "../../Components/Controls/ProTextInput";
import ProButton from "../../Components/Controls/ProButton";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import BackgroundView from "../../Components/Layout/BackgroundView";
import { emailSignUp } from "../../Services/Firebase/Firebase";
import { UserCredential } from "firebase/auth";
import ProPopup from "../../Components/Layout/ProPopup";
import { EMAIL_REGEX } from "../../Constants/Values";
import { UserDetails, setUserAccount, setUserCredential } from "../../Services/Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { CreateUserApiArg, User, useCreateUserMutation } from "../../Services/Redux/Api";
import { navigateToMainStack, navigateToProfileEditor, updateAuthState } from "./UpdateAuthState";
import { User as FBUser } from "firebase/auth";
import ProLoading from "../../Components/Layout/ProLoading";
import { set } from "date-fns";

const SignUpScreen: React.FC = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isLoadingAuthState, setIsLoadingAuthState] = useState<boolean>(false);

  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  const onRegisterPressed = async (data: any) => {
    const { email, password } = data;
    setIsLoadingAuthState(true);
    emailSignUp(email, password).then(async (userCredential: UserCredential)=> {
        const user = userCredential.user;
        await updateAuthState(user, dispatch, navigation, true);         
        console.log(user);
        setResultText(user.email + ' Created!'|| 'Signed up')
        setIsVisible(true);
      }).catch((error: any) => {
        console.log(error);
        setResultText(error.message)
        setIsVisible(true);
        setIsLoadingAuthState(false);  
    });
  };

  const onSignInPress = () => {
    navigation.navigate("Login");
  };

  if(isLoadingAuthState){
    return (
      <BackgroundView children={(
        <ProLoading/>
      )}></BackgroundView>
    )
  }


  return (
    <BackgroundView hasSafeAreaView
      children={
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: "center"}}>
          <View style={styles.root}>
            {/* <KeyboardAvoidingView behavior="position" > */}
              <ProHeader
                text="Create an account"
                headerType={HeaderType.H3}
              ></ProHeader>

              <ProTextInput
                name="email"
                control={control}
                placeholder="Email"
                rules={{
                  required: "Email is required",
                  pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
                }}
                returnKeyType='next'
                keyboardType='email-address'
                textContentType='emailAddress'
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <ProTextInput
                name="password"
                control={control}
                placeholder="Password"
                secureTextEntry
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters long",
                  },
                }}
                returnKeyType='next'
                textContentType="password"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                ref={passwordRef}
              />
              <ProTextInput
                name="password-repeat"
                control={control}
                placeholder="Repeat Password"
                secureTextEntry
                rules={{
                  validate: (value) => value === pwd || "Password do not match",
                }}
                textContentType="password"
                ref={confirmPasswordRef}
              />

              <ProButton
                text="Register"
                onPress={handleSubmit(onRegisterPressed)}
              />

              <ProButton
                text="Have an account? Sign in"
                onPress={onSignInPress}
              />
            {/* </KeyboardAvoidingView> */}
          </View>
          <ProPopup isVisible={isVisible} title={resultText} onDismiss={()=>{setIsVisible(false)}}></ProPopup>

        </ScrollView>
      }
    ></BackgroundView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default SignUpScreen;
