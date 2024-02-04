import React from 'react'
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import BackgeoundView from '../../Components/Layout/BackgroundView';
import { Touchable } from 'react-native';
import JobCard from '../../Features/Jobs/JobCard';
import ServiceCard from './ServiceCard';
import { Colors } from 'react-native-ui-lib';



const Search1 = () => {
  const services = [{service :"Gardner", imageurl: "C:\Users\azizh\OneDrive\שולחן העבודה\ConstructorsIcons\gardner2.png"}, {service : "Plumber", imageurl : "C:\Users\azizh\OneDrive\שולחן העבודה\ConstructorsIcons\plumber.png"}, {service :"Electrican", imageurl: "C:\Users\azizh\OneDrive\שולחן העבודה\ConstructorsIcons\electrican2.png"}, {service :"Carpenter", imageurl: "C:\Users\azizh\OneDrive\שולחן העבודה\ConstructorsIcons\carpenter2.png"}];

  return (
   
    <BackgeoundView children={

      <View style={styles.container}>

      <View style={styles.textFieldTextContainer} >
      <Text>Select a service</Text>
      <TextInput placeholder='insert service' style={styles.insertServiceTextField}/>
      
     </View>

     <ScrollView>

     

     <View style={styles.servicesContainer}>

     

      {services.map( (service) => {
        return(
          <View>
        <TouchableOpacity style={styles.touchableOpacityStyle}>
          {/* <ServiceCard imageurl={service.imageurl} profession={service.service} /> */}
           
           
        </TouchableOpacity>
        </View>

        )
      })}

   
      

     </View>
     </ScrollView>

      </View>

      

    }/>
    


  
  )
}

export default Search1

const styles = StyleSheet.create({
  servicesContainer : {
    flexDirection:"row",
    justifyContent:"space-between",
    width:"90%",
    alignSelf: "center",
    flexWrap:"wrap",
    marginBottom:100,
  },

  touchableOpacityStyle:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:15,
  },

  insertServiceTextField:{
    backgroundColor:"white",
    paddingLeft: 5,
    height:35,
    
  },
  container:{
    gap : 15,
    padding: 5,

  },

  textFieldTextContainer:{
    gap : 5,
    borderBottomWidth : 2,
    paddingLeft:2,
    paddingBottom:10,
    paddingRight:50,
    borderColor : Colors.$backgroundDark
    
  }
})
