import React, { useState } from "react";
import {View, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


interface loactionWorksProps {
  location:string;
}
const LocationWork :React.FC<loactionWorksProps> = (props) => {
  
return (
  <View style={styles.telephoneContainer} >

    <Icon name="location-on" size={25} color="blue" />
    <Text style={styles.phoneNum}>
      works in {props.location}
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
    
  }
})
export default LocationWork;


