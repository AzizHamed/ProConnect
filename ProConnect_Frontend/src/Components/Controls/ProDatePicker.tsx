import { View, TextInput, TouchableOpacity, Platform } from 'react-native'
import { Colors, Text } from 'react-native-ui-lib'
import React, { useState } from 'react'
import { IS_WEB } from '../../Constants/Values'
import { createElement } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProDatePickerProps {
    control: any,
    name: string,
    placeholder?: string,
    setValue?: (value: any) => void,
}

const ProDatePicker: React.FC<ProDatePickerProps> = (props) => {
    const isWeb = IS_WEB();
    const [date, setDate] = useState(new Date(Date.now()));
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    // format the date to dd-mm-yyyy
    const formatDate = (date: Date) => {        
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    const onChange = (event: any, selectedDate: any) => {
        setShowDatePicker(false);
        setTimeout(() => {            
            if(event.type === 'set') {
                const currentDate = selectedDate || date;
                setDate(currentDate);
            }
        }, 10);
    };
    if(isWeb) {
        return createElement('input', {
            type: 'date',
            value: date.toISOString().split("T")[0],
            onChange: (event) => {
              setDate(new Date(event.target.value))
              },
            style: {height: 50, padding: 5, border: "1px solid #677788", borderRadius: 5,  width: 250}
          })
    }
  return (
        <View>
            <Text marginB-10>{props.name}</Text>
            <TouchableOpacity onPress={()=>{if(!showDatePicker) toggleDatePicker();}}>
                <Ionicons name="calendar" size={24} style={{position: 'absolute', top: 10, left: 20}} color={Colors.textPrimary}/>
                <TextInput style={{color: Colors.textPrimary, fontSize: 16, height: 45, paddingLeft: 60, borderColor: Colors.controlText, borderWidth: 1, borderRadius: 50}} editable={false} placeholder={props.placeholder} value={date.toDateString()}/>
            </TouchableOpacity> 
            {showDatePicker && <RNDateTimePicker value={date} mode='date' display='spinner' onChange={onChange}/>}
        </View>
  )
}

export default ProDatePicker