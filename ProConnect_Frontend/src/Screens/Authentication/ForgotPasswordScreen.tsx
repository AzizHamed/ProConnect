import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import ProButton from "../../Components/Controls/ProButton";
import ProTextInput from "../../Components/Controls/ProTextInput";
import BackgroundView from "../../Components/Layout/BackgroundView";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { EMAIL_REGEX } from "../../Constants/Values";
import { sendResetPasswordEmail } from "../../Services/Firebase/Firebase";

const ForgotPasswordScreen: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendPressed = async (data: any) => {
    const {email} = data;
    sendResetPasswordEmail(email).then().catch();
  };

  const onSignInPress = () => {
    navigation.navigate("Login");
  };

  return (
    <BackgroundView hasSafeAreaView
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
          <ProHeader
                text="Reset your password"
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

            <ProButton text="Send Password Reset E-mail" onPress={handleSubmit(onSendPressed)} />

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

export default ForgotPasswordScreen;
