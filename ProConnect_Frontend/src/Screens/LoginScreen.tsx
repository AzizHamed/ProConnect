import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { get, post } from "../Services/Requests";
import getColors from "../Constants/Colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function printDetails() {
    console.log(`Your email is ${email}, your password is ${password}`);
  }

  useEffect(() => {
    let map = new Map<string, any>();
    map.set("name", "Hadi");
    post("test/postUser", { name: "Username", email: "test@gmail.com" }, map)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello! Your email is: {email} | Password = {password}
        </Text>
        <TextInput
          onChangeText={(newText) => setEmail(newText)}
          textContentType="emailAddress"
          defaultValue={email}
          placeholder="E-Mail"
          style={styles.input}
        ></TextInput>
        <TextInput
          onChangeText={(newText) => setPassword(newText)}
          secureTextEntry={true}
          defaultValue={password}
          placeholder="Password"
          style={styles.input}
        ></TextInput>
        <Button title="Click Me" onPress={printDetails} color={colors.highlight} />
      </View>
    </View>
  );
};

// const colors = getColors('Dark');
const colors = getColors();
const styles = StyleSheet.create({
  input: {
    height: 35,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    color: colors.textColor,
    borderColor: colors.textColor
  },
  container: {
    width: "50%",
    backgroundColor: colors.container,
    color: colors.textColor,
    padding: 20,
    margin: "auto",
  },
  background: {
    width: "100%",
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: colors.textColor
  }
});
export default LoginScreen;
