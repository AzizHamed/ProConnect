import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import PersonCard from '../../Features/Persons/PersonCard'
import { User } from '../../Services/Redux/Api'
import { Colors } from 'react-native-ui-lib'
import { PersonPage1, PersonPage2 } from '../../Constants/Values';
import { AirbnbRating } from 'react-native-ratings'
import ProButton from '../../Components/Controls/ProButton'

interface RateModalProps {
  user : User
  setModalVisible : (value : boolean) => void
}

const RateModal :React.FC<RateModalProps> =  (props) => {
  return (
   <View style={{marginTop : 250, marginLeft : 20, backgroundColor: Colors.$backgroundDarkActive,borderRadius: 20 ,alignItems: 'center',
   justifyContent : "space-between",
   shadowColor: '#000',
   paddingTop : 50,
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
   // Change the width here
   width: 375, // Adjust this value as needed
   height: 400, // Adjust this va
  }}>
    
      <PersonCard user={props.user} imageurl={'../../../gardner2.png'} imageStyle={PersonPage2.imageStyle} componentsUnderImage={[
      <Text style={{ color: "white" }}> {props.user.name.firstName} {props.user.name.lastName}</Text>,

  <Text style={{ color: "white" }}>Software Engineering</Text>,
  <Text style={{ color: "white" }}>{props.user.experience} years experience</Text>



  ]} additionalComponents={[<AirbnbRating
    defaultRating={5}
    count={5}
    size={25}
    isDisabled={false}
    onFinishRating={()=>{props.setModalVisible(false)}}
    showRating={false}  starContainerStyle={{marginRight : 2}}/>]} cardContainerStyle={PersonPage2.CardContainerStyle} containerStyle={{backgroundColor : Colors.$backgroundDark}}/>

    <ProButton text={"Close"} onPress={()=>{props.setModalVisible(false)}}/>

   </View>
  )
}

export default RateModal


