import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface DropDownProps {
  value : string
  setlocation : (location : string)=>void
  dropDownData : Object[]
  
}



const DesignedDropDown : React.FC<DropDownProps> = (props) => {

const [isFocusLocation, setIsFocusLocation] = useState(false);


const [valueLocation, setValueLocation] = useState(props.value);






function reset(){
  setValueLocation("choose location")
  props.setlocation("choose location")
}



  return (
    <>
    <Dropdown
          style={[styles.dropdown, isFocusLocation && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.dropDownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusLocation ? valueLocation : '...'}
          searchPlaceholder="Search..."
          value={valueLocation}
          onFocus={() => setIsFocusLocation(true)}
          onBlur={() => setIsFocusLocation(false)}
          onChange={item => {
            setValueLocation(item.value);
            setIsFocusLocation(false);
            props.setlocation(item.value);
            
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
