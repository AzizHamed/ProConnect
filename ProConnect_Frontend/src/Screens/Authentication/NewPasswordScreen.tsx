import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import ProTextInput from "../../Components/Controls/ProTextInput";
import ProButton from "../../Components/Controls/ProButton";
import BackgroundView from "../../Components/Layout/BackgroundView";

const NewPasswordScreen: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async (data: any) => {
    // try {
    //   await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
    //   navigation.navigate('SignIn');
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <BackgroundView
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

            <ProTextInput
              placeholder="Username"
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
            />

            <ProTextInput
              placeholder="Code"
              name="code"
              control={control}
              rules={{ required: "Code is required" }}
            />

            <ProTextInput
              placeholder="Enter your new password"
              name="password"
              control={control}
              secureTextEntry
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
              }}
            />

            <ProButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

            <ProButton text="Back to Sign in" onPress={onSignInPress} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default NewPasswordScreen;
