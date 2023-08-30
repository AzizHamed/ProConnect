import React, { useState } from "react";
import {View, Image, StyleSheet, Text, Button } from "react-native";
import Colors from "../../Constants/Colors";
import ProfileImg from "./ProfileImg";
import getColors from "../../Constants/Colors";
import  Telephone from "./Telephone"; // Import Telephone and addPhone
import EMail from "./EMail";
import LocationWork from "./LocationWork";

interface ProfileInfoProps {
  name:string;
  job : string;
  experience:string;
  telephone:string;
  email:string;
  availibailty:string;
  location:string;
  profileImg:string;
}
const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  return (
    <View style={styles.wrapper}>

    <View>
      <ProfileImg img={props.profileImg}/>
    </View>

   <View style={styles.Container}>
   
    <View style={styles.personalInfo} >
      <Text style={styles.titleStyle}>
        {props.name}
      </Text>

      <Text>
        {props.job}
      </Text>

      <Text>
        {props.experience}
      </Text>

    </View>

    <View style={styles.contactInfo}>

      <Text style={styles.titleStyle}>
        Contact Information
      </Text>

     <Telephone telephone={props.telephone}/>

     <EMail email={props.email}/>

    </View>
    
    <View style={styles.availibality}>
    <Text style={styles.titleStyle}>
      Availibality
    </Text>
    <Text>

    {props.availibailty}
    </Text>

    <LocationWork location={props.location}/>
    </View>

    <View style={styles.proposeAjobBC}>
      
      <button  style={styles.proposeAjobB}  >

      Propose a job
       </button>
        
     
    </View>


    </View>
    </View>
     )
}

const styles = StyleSheet.create({

Container:{
  flexDirection: "row",
  alignItems:"flex-start",
  height:75,
  width:1000,
  justifyContent:'space-between',
 //backgroundColor:'yellow'

},

personalInfo:{

  marginLeft:30,
},
contactInfo:{
  marginLeft:30,
},

availibality:{
  marginLeft:30,
  justifyContent:'flex-start'

},

proposeAjobBC:{
  marginLeft:30,

},

proposeAjobB:{
  borderRadius:20,
  height:60,
  width:200,
  backgroundColor:getColors().highlight,
  borderColor:getColors().highlight,
  fontFamily:"Arial",
  fontSize:20,
  color:"white"
  

},

titleStyle:{
  fontWeight:"bold",
},

wrapper:{
  alignItems:'center',
  flexDirection:"row",
  height:200,
 // backgroundColor:'green'
}





})
export default ProfileInfo