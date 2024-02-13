import React from 'react'
import { View,Image,Text, StyleSheet } from 'react-native'
import { User } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import { Rating } from 'react-native-ratings';
import { AirbnbRating } from 'react-native-elements';

interface ProfessionalCardProps {
  imageurl :string;
  user : User;
}

const ProfessionalCard :React.FC<ProfessionalCardProps> =  (props) => {
  return (
  <View style={styles.container}>

<View style={styles.CardContainer}>

      
<Image
source={require('../../../gardner2.png')}
style={{
  height: 120,
  width: 120,
  borderRadius:70,
 
  

}}
/>

<Text style={{color:"white"}}> {props.user.name.firstName} {props.user.name.lastName}</Text>
<Text style={{color:"white"}}>Software Engineering</Text>
<Text style={{color:"white"}}>12 years experience</Text>




</View>

<AirbnbRating 
count={5}
size={20}
isDisabled={true}
showRating={false}

/>


{/* <Rating
  type='star'
  ratingBackgroundColor='white'
  ratingCount={5}
  imageSize={30}
  readonly={true}
  

  style={{  }}
/> */}

</View>

    
  )
  }



export default ProfessionalCard

export const styles = StyleSheet.create({

  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width:190,
    height:220,
    alignItems:"center",
    justifyContent:"center",
    
  }
  ,
  container : {
    backgroundColor:Colors.$backgroundDark,
   
  }

})


  