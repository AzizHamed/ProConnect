import React from 'react'
import { View,StyleSheet,Text } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { Colors } from 'react-native-ui-lib'

interface RenderPopularProfessionsProps {
  
  
 profession : string;
 number : number;
 uri : string;
  
}

const renderPopularProfessions  = ({item} : {item : RenderPopularProfessionsProps}) => {
  return (
  
    <View style={styles.container}>

    <View style={styles.cardContainerStyle}>
    
          
    <SvgUri uri={item.uri} 
    width="80"
    height="80" 
    fill={"white"}
    />

    <Text style={{color : "white"}}> {item.profession}</Text>
    
   
    
    </View>

    <View style={{height:50, alignItems : "center", justifyContent : "center"}}>

      <View>
      <Text style={{fontSize : 20}}>{item.number} Users</Text>
      </View>
      
    </View>
    
    
    
    
    
    
    </View>

  )
    
        
      
      }
    
    
      

export default renderPopularProfessions

const styles = StyleSheet.create({

  cardContainerStyle : {
  width:"100%",
  height:200,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor :Colors.$backgroundDark
  },
  container : {
    backgroundColor: "white",
    alignItems :"center",
    justifyContent : "flex-start",
    height : 250,
    width : 250, 
  }

})


  
  


