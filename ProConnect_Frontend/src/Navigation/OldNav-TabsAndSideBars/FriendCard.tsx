import React from 'react'
import { View,Image,Text, StyleSheet } from 'react-native'
import { User } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import { Rating } from 'react-native-ratings';
import { AirbnbRating } from 'react-native-elements';
import ProButton from '../../Components/Controls/ProButton';

interface FriendCardProps {
  imageurl :string;
  user : User;
}

const FriendCard :React.FC<FriendCardProps> =  (props) => {
  return (
  <View style={styles.container}>

<View style={styles.CardContainer}>

      
<Image
source={require('../../../gardner2.png')}
style={{
  height: 100,
  width: 100,
  borderRadius:70,
  marginBottom:8,
 
  

}}
/>

<Text style={{color:"white"}}> {props.user.name.firstName} {props.user.name.lastName}</Text>
<Text style={{color:"white"}}>Software Engineering</Text>




</View>

<View style={styles.buttonsContainer}>
  <ProButton text={"Chat"} mobileWidth={180} />
</View>




</View>

    
  )
  }



export default FriendCard

const styles = StyleSheet.create({

  buttonsContainer : {
    
    backgroundColor : Colors.$backgroundDark,
  },

  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width:180,
    height:180,
    alignItems:"center",
    justifyContent:"center",
    
  }
  ,
  container : {
    backgroundColor:Colors.$backgroundDark,
   
  }

})


  