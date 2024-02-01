import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
// import Logo from '../../../assets/images/Logo_1.png';
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import ProButton from "../../Components/Controls/ProButton";
import ProTextInput from "../../Components/Controls/ProTextInput";
import BackgroundView from "../../Components/Layout/BackgroundView";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data: any) => {
    if (loading) {
      return;
    }

    setLoading(true);
    // try {
    //   const response = await Auth.signIn(data.username, data.password);
    //   console.log(response);
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <BackgroundView
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            {/* <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        /> */}

            <ProTextInput
              name="username"
              placeholder="Username"
              control={control}
              rules={{ required: "Username is required" }}
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
