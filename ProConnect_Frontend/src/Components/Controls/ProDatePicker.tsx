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
    setValue: (value: Date) => void,
}

const ProDatePicker: React.FC<ProDatePickerProps> = (props) => {
    const isWeb = IS_WEB();
    const [date, setDate] = useState(new Date(Date.now()));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const style = { color: Colors.black, fontSize: 16, height: 45, borderColor: Colors.controlText, borderWidth: 1, borderRadius: 50 };
    const dateTitle = props.name !== undefined ? <Text marginB-10>{props.name}</Text> : <></>; 
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
            if (event.type === 'set') {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                props.setValue(date);
            }
        }, 10);
    };
    if (isWeb) {
        return (
            <View>
                {dateTitle}
                {createElement('input', {
                    type: 'date',
                    value: date.toISOString().split("T")[0],
                    onChange: (event) => {
                        setDate(new Date(event.target.value))
                    },
                    style: { marginTop: 5, padding: 5, paddingLeft: 20, border: "1px solid #677788", ...style }
                })}
            </View>
        )
    }
    return (
        <View>
            {dateTitle}
            <TouchableOpacity onPress={() => { if (!showDatePicker) toggleDatePicker(); }}>
                <Ionicons name="calendar" size={24} style={{ position: 'absolute', top: 10, left: 20 }} color={Colors.textPrimary} />
                <TextInput style={[style, { paddingLeft: 60 }]} editable={false} placeholder={props.placeholder} value={date.toDateString()} />
            </TouchableOpacity>
            {showDatePicker && <RNDateTimePicker value={date} mode='date' display='spinner' onChange={onChange} />}
        </View>
    )
}

export default ProDatePicker