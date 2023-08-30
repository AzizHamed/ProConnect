import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Constants/Colors";
import {Feather} from "@expo/vector-icons"
import ProfileInfo from "../Components/Profile/ProfileInfo";
import getColors from "../Constants/Colors";
import GalleryAbrief from "../Components/Profile/GalleryAbrief";

const Profile = () => {

  let [name, setName] = useState('')
  let [Job, setJob] = useState('')
    return (
      <View style={styles.container}>
        <ProfileInfo name={""} job={""} experience={""} telephone={""} email={""} availibailty={""} location={""} profileImg={'Borjomi.jpg'}/>
        <GalleryAbrief about={"In this modified code, I've introduced an interface GalleryImageProps to define the expected props for the GalleryImage component. The source prop is used to dynamically set the image source, and the imageStyle prop is used to allow custom styling of the Image component.Now, when you use the GalleryImage component in your application, you can pass the desired values for the source and imageStyle props:"} urls={['']}/>
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