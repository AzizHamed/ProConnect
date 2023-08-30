import React, { useState } from "react";
import {View, Image, StyleSheet, Text, Button } from "react-native";
import Colors from "../../Constants/Colors";
import ProfileImg from "./ProfileImg";
import getColors from "../../Constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';


interface TelephoneProps {
   telephone:string;
}
const Telephone: React.FC<TelephoneProps> = (props) => {
  
return (
  <View style={styles.telephoneContainer} >

    <Icon name="phone" size={25} color="blue" />
    <Text style={styles.phoneNum}>
      {props.telephone}
    </Text>

  </View>
)
}

const styles = StyleSheet.create({
  telephoneContainer:{
    flexDirection:"row",
    alignItems:'flex-end'
  },
  phoneNum:{
    marginLeft:8
  }
})
export default Telephone;


