import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Constants/Colors";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function printDetails(){
        console.log(`Your email is ${email}, your password is ${password}`);
    }

    return (
        <View style={styles.background}>

        <View style={styles.container}>
            <Text>Hello! Your email is: {email} | Password = {password}</Text>
            <TextInput onChangeText={newText => setEmail(newText)} textContentType="emailAddress" defaultValue={email} placeholder="E-Mail" style={styles.input}></TextInput>
            <TextInput onChangeText={newText => setPassword(newText)} secureTextEntry={true} defaultValue={password} placeholder="Password" style={styles.input}></TextInput>
            <Button title="Click Me" onPress={ printDetails }/>
        </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input:{
        height: 35,
        borderWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    container:{
        width: "50%",
        backgroundColor: Colors.container,
        padding: 20,
        margin: "auto"
    },
    background:{
        width: "100%",
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: "center" 
    }
})
export default LoginScreen