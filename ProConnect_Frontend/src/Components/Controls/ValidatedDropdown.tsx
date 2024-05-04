import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import DesignedDropDown, { DropDownProps } from '../../Navigation/DesignedDropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Control, Controller } from 'react-hook-form';

const icon = <Ionicons name="home" size={20} style={{ marginLeft: 5, marginRight: 10 }} />

interface ValidatedDropDownProps {
    control: Control;
    errorMessage: string;
    triggerValidation: boolean;
    setIsValid: (val: boolean) => void;
}

const ValidatedDropDown: React.FC<ValidatedDropDownProps & DropDownProps> = (props) => {
    const [selectedValue, setSelectedValue] = useState<any>(undefined);
    const [hasError, setHasError] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const values = props.values;

    const validateDropdown = () => {
        if (selectedValue === undefined || selectedValue === null) {
            props.setIsValid(false);
            if (wasSubmitted)
                setHasError(true);
        }
        else {
            props.setIsValid(true);
            if (wasSubmitted)
                setHasError(false);
        }
        if (!wasSubmitted) setWasSubmitted(true);
        // console.log(hasError, selectedValue)
    }

    const updateSelectedValue = (value: any) => {
        if (!wasSubmitted) setWasSubmitted(true);
        setSelectedValue(value);
        validateDropdown();
        if(props.setValue) props.setValue(value);
    }
    useEffect(() => {
        if (props.triggerValidation || wasSubmitted)
            validateDropdown();
    }, [selectedValue, wasSubmitted, props.triggerValidation]);
    useEffect(() => {
        if (props.selectedValue !== undefined && props.selectedValue !== null){
            setSelectedValue((prevValue:any) => (props.selectedValue));
            validateDropdown();
        }
    }, [])

    return (
        <Controller
            control={props.control}
            defaultValue={props.selectedValue || ''}
            name="validatedDropdown"
            render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
                <DesignedDropDown
                    leftIcon={props.leftIcon}
                    selectedValue={value}
                    setValue={(newValue) => { updateSelectedValue(newValue); onChange(newValue); }}
                    setFocus={props.setFocus}
                    flexShrink={props.flexShrink}
                    containerStyle={props.containerStyle}
                    values={values}
                    componentAfterDropdown={(selectedValue === undefined) ? <Text style={{ color: Colors.failure, alignSelf: 'stretch' }}>{props.errorMessage}</Text> : <></>}
                >
                </DesignedDropDown>
            )} />

    );
};

export default ValidatedDropDown;