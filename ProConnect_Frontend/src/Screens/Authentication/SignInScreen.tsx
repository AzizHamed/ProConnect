import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from "react-native";
// import Logo from '../../../assets/images/Logo_1.png';
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import ProButton from "../../Components/Controls/ProButton";
import ProTextInput from "../../Components/Controls/ProTextInput";
import BackgroundView from "../../Components/Layout/BackgroundView";
import ProPopup from "../../Components/Layout/ProPopup";
import { emailSignIn } from "../../Services/Firebase/Firebase";
import { UserCredential } from "firebase/auth";
import { EMAIL_REGEX } from "../../Constants/Values";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { View } from "react-native-ui-lib";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [resultText, setResultText] = useState('');


  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSignInPressed = async (data: any) => {
    const { email, password } = data;
    if (loading) {
      return;
    }

    setLoading(true);
    emailSignIn(email, password).then((userCredential: UserCredential)=> {
      const user = userCredential.user;
      console.log(user);
      setResultText(user.email + ' Logged in!'|| 'Logged In')
      setIsVisible(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }).catch((error: any) => {
      console.log(error);
      setResultText(error.message)
      setIsVisible(true);
  }) ;
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <BackgroundView
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root} padding-20 paddingB-50 bg>
            {/* <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        /> */}
              <ProHeader
                text="Login"
                headerType={HeaderType.H3}
              />

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
              placeholder="Password"
              secureTextEntry
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password should be minimum 3 characters long",
                },
              }}
            />

            <ProButton
              text={loading ? "Loading..." : "Sign In"}
              onPress={handleSubmit(onSignInPressed)}
            />

            <ProButton
              text="Forgot password?"
              onPress={onForgotPasswordPressed}
            />

            <ProButton
              text="Don't have an account? Create one"
              onPress={onSignUpPress}
            />
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
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
