import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

import { EvilIcons } from '@expo/vector-icons';
interface MyTextInputProps {
  onChange : (text : string) => void
  placeHolder : string;
  icon : React.ReactNode

}

const MyTextInput : React.FC<MyTextInputProps> =  (props) => {
  return (
    <View style={styles.container}>

{props.icon}
    
    <TextInput placeholder={props.placeHolder} style={styles.textInputStyle} onChangeText={(text) => {props.onChange(text)}}/>
    
    
          
    </View>
  )
}

export default MyTextInput

const styles = StyleSheet.create({

  container : {
    display :"flex",
    flexDirection:"row",
  },

  textInputStyle : {
    backgroundColor :"white",
    paddingLeft : 5,
    height : 50,
    flex : 1,
  },
});

