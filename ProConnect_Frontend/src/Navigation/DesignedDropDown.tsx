import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface DropDownProps {
  value : string
  set : (location : string)=>void
  dropDownData : {label : string, value :string}[]
  leftIcon : any
  setFocus : (value : boolean) =>void
  
}



const DesignedDropDown : React.FC<DropDownProps> = (props) => {

const [isFocus, setIsFocus] = useState(false);


const [value, setValue] = useState(props.value);






function reset(){
  setValue("choose location")
  props.set("choose location")
}



  return (
    <>
    <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={props.dropDownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? value : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => props.setFocus(true)}
          onBlur={() => props.setFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            props.set(item.value);
            
          }}

          renderLeftIcon={() => (
            props.leftIcon
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
