import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

import { EvilIcons } from '@expo/vector-icons';


const MyTextInput = () => {
  return (
    <>
    <TextInput placeholder='Search by name' style={styles.textInputStyle}>
          <EvilIcons name='search'  size={45}/>
          </TextInput>
    </>
  )
}

export default MyTextInput

const styles = StyleSheet.create({

  textInputStyle : {
    backgroundColor :"white",
    paddingLeft : 5,
    height : 50,
  },
});

