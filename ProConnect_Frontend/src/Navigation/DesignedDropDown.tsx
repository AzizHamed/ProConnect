import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import {Animated, StyleSheet} from 'react-native'
import { View } from 'react-native-ui-lib';
import { Control } from 'react-hook-form';

interface DropDownProps {
  control?: Control,
  name?: string
  value: string
  dropDownData: {label : string, value :any}[]
  leftIcon: any
  setValue: (value : any) => void
  setFocus?: (value : boolean) => void
  webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
  mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
  flexShrink?: boolean,
}


const DesignedDropDown : React.FC<DropDownProps> = (props) => {

const [isFocus, setIsFocus] = useState(false);
const [localValue, setLocalValue] = useState(props.value);

return (
  <View flexS={props.flexShrink}>
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
        placeholder={!isFocus ? localValue : '...'}
        searchPlaceholder="Search..."
        value={localValue}
        onFocus={() => {if(props.setFocus) props.setFocus(true)}}
        onBlur={() => {if(props.setFocus) props.setFocus(false)}}
        onChange={item => {
          setLocalValue(item.value);
          setIsFocus(false);
          props.setValue(item.value);
          
        }}

        renderLeftIcon={() => (
          props.leftIcon
        )}
      />
  </View>
)
}

export default DesignedDropDown



const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    backgroundColor:"white",
  },
  border:{
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
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
