import React from 'react'
import {Image, View, Text, Colors} from 'react-native-ui-lib'
import { ImageSourcePropType, StyleSheet } from 'react-native'

import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";


interface ServceCardProps {
  imageurl : string;
  profession : string;
}

const ServiceCard :React.FC<ServceCardProps> = (props) => {

  
  return (
 <View style={styles.container}>

<View style={styles.CardContainer}>

      
<Image
source={require(props.imageurl)}
style={{
  height: "70%",
  width: "70%",
  borderRadius:70,
  marginBottom:5,
 
  

}}
/>



</View>

<Text > {props.profession}</Text>

</View>
    
  )
}

export default ServiceCard

const styles = StyleSheet.create({

  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width:160,
    height:160,
    alignItems:"center",
    justifyContent:"center"
  }
  ,
  container : {
    backgroundColor:Colors.$backgroundDark,
  }

})

