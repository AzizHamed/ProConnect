import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import ProTextInput from "../../Components/Controls/ProTextInput";
import ProButton from "../../Components/Controls/ProButton";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import BackgroundView from "../../Components/Layout/BackgroundView";
import { emailSignUp } from "../../Services/Firebase/Firebase";
import { UserCredential } from "firebase/auth";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen: React.FC = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data: any) => {
    const { email, password } = data;
    emailSignUp(email, password).then((userCredential: UserCredential)=> {
        const user = userCredential.user;
        console.log(user);
    }).catch((error: any) => {
        console.log(error);
    }) ;
    // try {
    //   await Auth.signUp({
    //     username,
    //     password,
    //     attributes: {email, name, preferred_username: username},
    //   });

    //   navigation.navigate('ConfirmEmail', {username});
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <BackgroundView
      children={
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: "center"}}>
          <View style={styles.root}>
            {/* <KeyboardAvoidingView behavior="position" > */}
              <ProHeader
                text="Create an account"
                headerType={HeaderType.H3}
              ></ProHeader>

              {/* <ProTextInput
                name="name"
                control={control}
                placeholder="Name"
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 24,
                    message: "Name should be max 24 characters long",
                  },
                }}
              />
              <ProTextInput
                name="username"
                control={control}
                placeholder="Username"
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username should be at least 3 characters long",
                  },
                  maxLength: {
                    value: 24,
                    message: "Username should be max 24 characters long",
                  },
                }}
              /> */}
              <ProTextInput
                name="email"
                control={control}
                placeholder="Email"
                rules={{
                  required: "Email is required",
                  pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
                }}
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
              />
              <ProTextInput
                name="password-repeat"
                control={control}
                placeholder="Repeat Password"
                secureTextEntry
                rules={{
                  validate: (value) => value === pwd || "Password do not match",
                }}
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
