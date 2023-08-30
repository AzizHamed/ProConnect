import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Constants/Colors";
import {Feather} from "@expo/vector-icons"
import ProfileInfo from "../Components/Profile/ProfileInfo";
import getColors from "../Constants/Colors";
import GalleryAbrief from "../Components/Profile/GalleryAbrief";


interface ProfileProps{
  name:string;
  job:string;
  experience:string;
  telephone:string;
  email:string;
  availibality:string;
  location:string;
  profileImg:string;
  about:string;
}
const Profile : React.FC<ProfileProps> = (props) => {
    return (
      <View style={styles.container}>
        <ProfileInfo name={props.name} job={props.job} experience={props.experience} telephone={props.telephone} email={props.email} availibailty={props.availibality} location={props.location} profileImg={props.profileImg}/>

        <GalleryAbrief about={props.about} urls={['']}/>
       </View>
          
          

    )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft:10,
    flex:1,
    flexDirection:"column",
    backgroundColor:getColors().background,
  },
  
})



export default Profile