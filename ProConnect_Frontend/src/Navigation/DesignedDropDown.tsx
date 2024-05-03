import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { StyleProp, StyleSheet, ViewStyle} from 'react-native'
import { View, Text, Colors } from 'react-native-ui-lib';

import { defaultWidthValues } from '../Constants/Values';
export interface DropDownProps {
  selectedValue?: any
  values: {label: string, value: any}[]
  leftIcon?: React.ReactElement
  componentAfterDropdown?: React.ReactElement
  setValue: (value: any) => void
  setFocus?: (value: boolean) => void
  flexShrink?: boolean,
  containerStyle?: StyleProp<ViewStyle>
  
}


const DesignedDropDown : React.FC<DropDownProps> = (props) => {

const [isFocus, setIsFocus] = useState(false);
const [localValue, setLocalValue] = useState(props.selectedValue || undefined);
const width = defaultWidthValues();
const style = props.containerStyle === undefined ? {height: 50,
  width: width,
  paddingHorizontal: 8,
  backgroundColor:"white"} : props.containerStyle

return (
  <View width={"100%"} center invisible margin-5>
  <Dropdown
        style={[style, isFocus && { borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.values}
        search 
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? localValue : '...'}
        searchPlaceholder="Search..."
        value={localValue || props.selectedValue}
        onFocus={() => {if(props.setFocus) props.setFocus(true)}}
        onBlur={() => {if(props.setFocus) props.setFocus(false)}}
        onChange={item => {
          setLocalValue(item.value);
          setIsFocus(false);
          props.setValue(item.value);
          
        }}

        renderLeftIcon={() => (
          props.leftIcon || <></>
        )}        
      />
  <View marginT-10 marginB-20 invisible style={{width:width}}>{props.componentAfterDropdown && props.componentAfterDropdown}</View>
  </View>
)
}

export default DesignedDropDown



const styles = StyleSheet.create({
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
    paddingHorizontal: 8
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 16
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
