import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native'
import { View } from 'react-native-ui-lib';
import { Control } from 'react-hook-form';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/AntDesign';
interface DropDownProps {
  control?: Control,
  name?: string
  value: string
  dropDownData: {label : string, value :string}[]
  leftIcon: any
  setValue: (value : any) => void
  setFocus?: (value : boolean) => void
  webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
  mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
  flexShrink?: boolean,
  containerStyle ?:StyleProp<ViewStyle>
}


const DesignedDropDown : React.FC<DropDownProps> = (props) => {

const [isFocus, setIsFocus] = useState(false);
const [localValue, setLocalValue] = useState(props.value);

const style = props.containerStyle === undefined ? styles.dropdown : props.containerStyle

return (
  <View flexS={props.flexShrink}>
  <Dropdown
        style={[style, isFocus && { borderColor: 'blue' }]}
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
