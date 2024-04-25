import { View, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Text } from 'react-native-ui-lib'
import React, { useState } from 'react'
import { IS_WEB } from '../../Constants/Values'
import { createElement } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, FieldError } from 'react-hook-form';

interface ProDatePickerProps {
    control: any,
    name: string,
    placeholder?: string,
    setDateValue: (value: Date) => void,
    setFormattedDateString?: (value: string) => void,
}

const ProDatePicker: React.FC<ProDatePickerProps> = (props) => {
    const isWeb = IS_WEB();
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const style = { color: Colors.black, fontSize: 16, height: 45, borderColor: Colors.controlText, borderWidth: 1, borderRadius: 50 };
    const dateTitle = props.name !== undefined ? <Text marginB-10 style={{ width: "100%" }}>{props.name}</Text> : <></>;

    const errorText = (error: FieldError | undefined) => <Text style={{color: Colors.failure, alignSelf: 'stretch'}}>{error?.message || ' '}</Text>

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
                props.setDateValue(date);
                if (props.setFormattedDateString) props.setFormattedDateString(formatDate(currentDate));
            }
        }, 10);
    };

    return (
        <Controller
            control={props.control}
            defaultValue={''}
            name={props.name} rules={{ required: true }}
            render={({ field: { onChange:onFormChange }, fieldState: {error} }) => (
                isWeb
                    ? <View style={{ width: "100%" }}>
                        {dateTitle}
                        {createElement('input', {
                            type: 'date',
                            value: date.toISOString().split("T")[0],
                            onChange: (event: any) => {
                                setDate(new Date(event.target.value));
                                onFormChange(event.target.value);
                            },
                            style: { marginTop: 5, padding: 5, paddingLeft: 20, border: "1px solid #677788", ...style }
                        })}
                        {errorText(error)}
                    </View>
                    :
                    <View>
                        {dateTitle}
                        <TouchableOpacity onPress={() => { if (!showDatePicker) toggleDatePicker(); }}>
                            <TextInput style={[style, { paddingLeft: 60, backgroundColor: 'white' }]} editable={false} placeholder={props.placeholder} value={date.toDateString()} />
                            <Ionicons name="calendar" size={24} style={{ position: 'absolute', top: 10, left: 20 }} color={Colors.textPrimary} />
                        </TouchableOpacity>
                        {showDatePicker && <RNDateTimePicker value={date} mode='date' display='spinner' onChange={(event: any, selectedDate: any) => {onChange(event, selectedDate); onFormChange(selectedDate);}} />}
                        {errorText(error)}
                    </View>
            )} />

    );
}

export default ProDatePicker