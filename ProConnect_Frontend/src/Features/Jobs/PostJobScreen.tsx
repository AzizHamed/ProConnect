import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Property, usePostJobsMutation } from '../../Services/Redux/Api';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { useForm } from 'react-hook-form';
import ProButton from '../../Components/Controls/ProButton';
import DesignedDropDown from '../../Navigation/DesignedDropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Text } from 'react-native-ui-lib';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ValidatedDropDown from '../../Components/Controls/ValidatedDropdown';
import { useImagePicker } from '../../Hooks/useImagePicker';
import ProImagePicker from '../../Components/Controls/ProImagePicker';
import { SelectedFile } from '../../Constants/Types';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import { useSelector } from 'react-redux';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';

const icon = <Ionicons name="home" size={20} style={{ marginHorizontal: 5 }} />

const PostJobScreen: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const properties = [{ value: 1, label: "Property 1" }, { value: 2, label: "Property 2" }, { value: 3, label: "Property 3" }];
    const [isDropdownValid, setIsDropdownValid] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
    const user = useSelector(getUserAccount);

    const onSubmit = (data: any) => {
        console.log(data)
    
        if(isDropdownValid && user){
            // POST
            uploadSelectedFiles('jobs', selectedFiles, user).then((downloadUrls) => {
                // Handle the downloadUrls
                console.log(downloadUrls);
            });            
        }
    
    };
    const [triggerValidation, setTriggerValidation] = useState(false);

    const handleOnSubmit = () => {
        setTriggerValidation(prevState => !prevState);        
        handleSubmit(onSubmit)();
    }
    


    return (
        <BackgroundView hasScroll children={(
        <View style={{alignItems: "center", width:"100%"}}>

            <ProTextInput
                name="title"
                control={control}
                placeholder="Title"
                rules={{
                    required: "Title is required",
                    minLength: { value: 10, message: "Title is too short" },
                    maxLength: { value: 200, message: "Title is too long" },
                }}
            />
            <ValidatedDropDown setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} value='Select Property' values={properties} errorMessage='Property is required.'></ValidatedDropDown>
            <ProTextInput
                name="budget"
                control={control}
                placeholder="Budget"
                rules={{
                    required: "Budget is required",
                }}
                keyboardType='numeric'
            />
            <ProImagePicker setSelectedFiles={setSelectedFiles} uploadPath='jobs'></ProImagePicker>
            <ProButton text="Post Job" onPress={handleOnSubmit} />
        </View>

        )}/>
    );
};

export default PostJobScreen;