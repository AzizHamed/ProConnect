import React, { useEffect, useState } from 'react'
import { View, Text, WheelPicker, Colors } from 'react-native-ui-lib'
import { RouteProp, useNavigation } from "@react-navigation/native";
import BackgroundView from '../../Components/Layout/BackgroundView'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants';
import ProButton from '../../Components/Controls/ProButton'
import DesignedDropDown from '../DesignedDropDown';
import { MainTabParamList } from '../MainTabScreen';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { setPersonsPage } from '../../Services/Redux/Slices/PersonsPageSlice';



const Search = () => {

  const dispatch = useDispatch();

  const navigation = useNavigation();
  
  const [isFocus1, setIsFocus1] = useState(false);

  const [isFocus2, setIsFocus2] = useState(false);

  const [profession, setprofession] = useState("Select Profession")

  const [location, setlocation] = useState("Select Location")

  

 
  
  const dataLocation = [
    { label: 'Haifa', value:'1' },
    { label: 'Nazareth', value: '2' },
    { label: 'Kfar yasif', value: '3' },
    { label: 'Nahareya', value: '4' },
    { label: 'Acre', value: '5' },
    { label: 'Elat', value: '6' },
    { label: 'Karmiel', value: '7' },
    { label: 'Ramla', value: '8' },

    
  ];
  
  const dataProfessions = [
    { label: 'Carpetner', value:'1' },
    { label: 'Painter', value: '2' },
    { label: 'Constructor', value: '3' },
    { label: 'Pavor', value: '4' },
    { label: 'Electric service', value: '5' },
    { label: 'Security', value: '6' },
    { label: 'Designer', value: '7' },
    { label: 'Garden', value: '8' },
  ]
  return (
    <BackgroundView
      children={
        <View style={styles.textFieldsContainer}>

        
          <View style={styles.textContainer}>
          <Text style={styles.text}>Search For Professional With ProConnect</Text>
          </View>

          
<View>

  <Text>Select Profession</Text>

  <DesignedDropDown value={'Search Profession'} set={setprofession} dropDownData={dataProfessions} leftIcon={<AntDesign
              style={styles.icon}
              color={isFocus1 ? 'tomato' : 'black'}
              name="Safety"
              size={20} />} setFocus={setIsFocus1 } />


</View>
<View>
<Text>Select Location</Text>
<DesignedDropDown value={'Select Location'} set={setlocation} dropDownData={dataLocation} leftIcon={<AntDesign
              style={styles.icon}
              color={isFocus2 ? 'tomato' : 'black'}
              name="Safety"
              size={20} />} setFocus={setIsFocus2 } />

        

</View >




<ProButton text="Continue" onPress={()=>{
  dispatch(setPersonsPage({
  ComponentType : "Rating"
    
  }))
  navigation.navigate("PersonsPage");



}}/>


          
        </View>
      }
    />

    
  )
}



export default Search



  const styles = StyleSheet.create({

    CardContainer : {
      backgroundColor:Colors.$backgroundDark,
      // borderColor:"green",
      // borderWidth:5,
      width:190,
      height:220,
      alignItems:"center",
      justifyContent:"center",
      
    },
    imageStyle : {
      height: 120,
      width: 120,
      borderRadius:70,
  },

  textInput:{
    backgroundColor:"white",
    paddingLeft:5,
    height:"100%"
  },

  selectServiceContainer:{

  },
  
  buttonContainer:{
    
    
  },
  
  button : {
    marginVertical: 20,
		height: 40,
		marginHorizontal: 10,
		backgroundColor: '#5d57ff',
		justifyContent: 'center',
		alignItems: 'center',
  },

  clearButton:{
    backgroundColor:"red",
    width:"50%",    
    borderRadius:10,
  },


  textContainer:{
    padding:5,
  },

  text:{
    color:"white",
    fontStyle:"normal",
    fontWeight:"bold",


  },

  textFieldsContainer:{
    display:"flex",
    gap:30,
    padding: 15,
    height:70,
  },

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width:"80%",
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:"white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color:"black",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
