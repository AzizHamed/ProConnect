import { View, Text, Colors } from 'react-native-ui-lib'
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { defaultWidthValues } from '../../Constants/Values';

interface ChipInputProps {
    items: string[];
    maxItems?: number;
    maxItemLength?: number;
    label?: string;
    placeholder?: string;
    addText?: string;
    onAddItem: (item: any) => void;
    onRemoveItem: (index: number) => void;
    setComponentHeight?: (height: number) => void;
}

const ProChipInput: React.FC<ChipInputProps> = (props) => {
    const [inputValue, setInputValue] = useState('');
    const maxItems = props.maxItems || 10;
    const width = defaultWidthValues();
    const adjustedWidth = typeof width === 'number' ? width - 20 : width;
    return (
        <View invisible center onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            if (props.setComponentHeight) props.setComponentHeight(height);
        }}>
            {props.label && <Text center marginB-10>{props.label}</Text>}
            <View invisible row center width={adjustedWidth}>
                {props.addText && <Text flexS marginR-15 style={{ fontSize: 16 }}>{props.addText || ''}</Text>}
                <TextInput value={inputValue} onChangeText={setInputValue}
                    style={{
                        alignSelf: "center", backgroundColor: Colors.white, color: Colors.black,
                        padding: 5, paddingLeft: 15, borderRadius: 10, height: 50, width: "100%"
                    }}
                    placeholder={props.placeholder || 'Enter...'}
                    maxLength={props.maxItemLength || 50}
                    blurOnSubmit={false}
                    onSubmitEditing={(e) => {
                        const text = e.nativeEvent.text.trim();
                        if (props.items.length >= maxItems || text.length === 0) return;
                        props.onAddItem(text);
                        setInputValue('');
                    }}
                />
            </View>
            {(maxItems === props.items.length) && <Text center style={{ fontSize: 12, color: Colors.controlBackground, fontWeight: 'bold' }}>{`(max ${maxItems} items)`}</Text>}
            <View invisible row marginT-10 style={{ flexWrap: "wrap", }} center>

                {props.items.map((item, index) => (
                    <View key={index} row center spread marginH-5 marginV-4 paddingV-7 paddingL-15 paddingR-10 style={{ borderRadius: 50, borderWidth: 1 }}>
                        <Text style={{ fontSize: 14 }} marginR-5>{item}</Text>
                        <TouchableOpacity onPress={() => props.onRemoveItem(index)}>
                            <Entypo name="cross" size={16} color={Colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

        </View>
    );
};

export default ProChipInput;