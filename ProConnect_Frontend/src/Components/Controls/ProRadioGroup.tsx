import { TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import React, { useState } from 'react';


interface ProRadioGroupProps {
    options: string[];
    setSelectedIndex: (index: number) => void;
    title?: string;
    isColumn?: boolean;
}

const ProRadioGroup: React.FC<ProRadioGroupProps> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const options = props.options;
    const handleSelectOption = (index: number) => {
        setSelectedIndex(index);
        if(props.setSelectedIndex) props.setSelectedIndex(index);
    };
    return (
        <View invisible>
            {props.title && <Text>{props.title}</Text>}
            <View row={!props.isColumn} invisible spread>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleSelectOption(index)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                        }}
                    >
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: index === selectedIndex ? Colors.radioColorSelected : Colors.radioColorDeselected,
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {index === selectedIndex && (
                                <View
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: Colors.radioColorSelected,
                                    }}
                                />
                            )}
                    </View>
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    );
};

export default ProRadioGroup;
