import React from "react";
import { Button, Text, View } from "react-native";

const Test = () => {
    return (
        <View>
            <Text>Hello!</Text>
            <Button title="Click Me" onPress={()=>console.log("CLICK!")}/>
        </View>
    )
}

export default Test