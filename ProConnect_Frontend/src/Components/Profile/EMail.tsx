import React, { useState } from "react";
import {View, Image, StyleSheet, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface emailProps{
  email:string;
}
const EMail :React.FC<emailProps> = (props) => {
  
return (
  <View style={styles.emailContainer} >

    <Icon name="email" size={25} color="blue" />
    <Text style={styles.email}>
      {props.email}
    </Text>

  </View>
)
}

const styles = StyleSheet.create({
  emailContainer:{
    flexDirection:"row",
    alignItems:'center'
  },
  email:{
    marginLeft:8
  }
})
export default EMail;


