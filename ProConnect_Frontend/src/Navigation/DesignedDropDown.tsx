import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const DesignedDropDown = () => {

const [isFocusLocation, setIsFocusLocation] = useState(false);


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
  return (
    <>
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
            <FontAwesome
              style={styles.icon}
              color={isFocusLocation ? 'tomato' : 'black'}
              name="map-marker"
              size={20}
            />
          )}
        />
    </>
  )
}

export default DesignedDropDown

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:"white",
  },
  icon: {
    marginRight: 5,
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
