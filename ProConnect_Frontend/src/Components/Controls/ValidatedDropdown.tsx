import React, { useEffect, useState } from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import DesignedDropDown from '../../Navigation/DesignedDropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { defaultWidthValues } from '../../Constants/Values';
import { set } from 'date-fns';

const icon = <Ionicons name="home" size={20} style={{ marginLeft: 5, marginRight: 10 }} />

interface ValidatedDropDownProps {
    values: { value: any, label: string }[];
    value: string;
    errorMessage: string;
    triggerValidation: boolean;
    setIsValid: (val: boolean) => void;
}

const ValidatedDropDown: React.FC<ValidatedDropDownProps> = (props) => {
    const [selectedValue, setSelectedValue] = useState<any>(undefined);
    const [hasError, setHasError] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const values = props.values;
    const width = defaultWidthValues();

    const validateDropdown = () => {
    if (selectedValue === undefined || selectedValue === null) {
        props.setIsValid(false);
        if(wasSubmitted)
            setHasError(true);
    }
    else{
        props.setIsValid(true);
        if(wasSubmitted)
            setHasError(false);
        }
        if(!wasSubmitted) setWasSubmitted(true);
        console.log(hasError, selectedValue)
    }
    
    const updateSelectedValue = (value: any) => {
        if(!wasSubmitted) setWasSubmitted(true);
        setSelectedValue(value);
        validateDropdown();
    }
    useEffect(() => {
        if (props.triggerValidation || wasSubmitted) 
            validateDropdown();
      }, [selectedValue, wasSubmitted, props.triggerValidation]);

    return (
        <View style={{width: width, backgroundColor: "transparent", marginTop: 10, marginBottom: 5}}>
            <DesignedDropDown 
                leftIcon={icon} 
                value={props.value} 
                setValue={updateSelectedValue} 
                dropDownData={values}>
            </DesignedDropDown>
            <Text style={{color: Colors.failure, alignSelf: 'stretch'}}>{hasError ? props.errorMessage : ' '}</Text>
        </View>
    );
};

export default ValidatedDropDown;