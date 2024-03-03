import React, { Component, ReactElement } from 'react'
import { View,Image,Text, StyleSheet, ImageStyle, StyleProp, ViewStyle, Dimensions } from 'react-native'
import { User } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import { Rating } from 'react-native-ratings';
import { AirbnbRating } from 'react-native-elements';
import ProButton from '../../Components/Controls/ProButton';

interface PersonCardProps {
  imageurl :string;
  imageStyle : ImageStyle
  user : User;
  compnentsUnderImage : React.ReactNode[]
  additionalComponents ?: ReactElement[]
  cardContainerStyle : StyleProp<ViewStyle>
  containerStyle ?:  StyleProp<ViewStyle>
  
  
}

const PersonCard :React.FC<PersonCardProps> =  (props) => {

  const {height, width} = Dimensions.get('window')


  
  return (
  <View style={props?.containerStyle}>

<View style={props.cardContainerStyle}>

      
<Image
source={require('../../../gardner2.png')}
style={props.imageStyle}
/>

{props.compnentsUnderImage} 




</View>



<View style={styles.buttonsContainer}>

{props.additionalComponents}
 
</View>




</View>

    
  )
  }



export default PersonCard

const styles = StyleSheet.create({

  buttonsContainer : {
    alignItems : "center",
    justifyContent : "center",
  },


  container : {
   
  }

})


  