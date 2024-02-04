import React, { useState } from 'react'
import { View, Text, WheelPicker } from 'react-native-ui-lib'
import {Button} from 'react-native-elements'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, TouchableOpacity } from 'react-native'
import SearchTextFields from './SearchTextFields'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants';
import Service from './Service'
import ProButton from '../../Components/Controls/ProButton'


const Search = () => {
  const [isFocusProfession, setIsFocusProfession] = useState(false);

  const [isFocusLocation, setIsFocusLocation] = useState(false);

  const [valueProfession, setValueProfession] = useState(null);

  const [valueLocation, setValueLocation] = useState(null);
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

  <Dropdown
          style={[styles.dropdown, isFocusProfession && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataProfessions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusProfession ? 'Select Profession' : '...'}
          searchPlaceholder="Search..."
          value={valueProfession}
          onFocus={() => setIsFocusProfession(true)}
          onBlur={() => setIsFocusProfession(false)}
          onChange={item => {
            setValueProfession(item.value);
            setIsFocusProfession(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusProfession ? 'tomato' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />


</View>
<View>
<Text>Select Location</Text>
<Dropdown
          style={[styles.dropdown, isFocusLocation && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataLocation}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusLocation ? 'Select Location' : '...'}
          searchPlaceholder="Search..."
          value={valueLocation}
          onFocus={() => setIsFocusLocation(true)}
          onBlur={() => setIsFocusLocation(false)}
          onChange={item => {
            setValueLocation(item.value);
            setIsFocusLocation(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusLocation ? 'tomato' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />

        

</View >





{/* <Button  title={"Go"} buttonStyle={styles.button}  />
{/* <TouchableOpacity
				onPress={() => {
					console.log('I am tapped');
				}}
				style={styles.button}
			>
				<Text>Custom Button</Text>
        </TouchableOpacity>
</View> */}

<ProButton isResponsive label='Continue'/>


          
        </View>
      }
    />

    
  )
}



export default Search

  const styles = StyleSheet.create({

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
