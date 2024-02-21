import React, { useEffect, useState } from 'react';
import { Property, usePostJobsMutation, useGetPropertiesQuery } from '../../Services/Redux/Api';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { useForm } from 'react-hook-form';
import ProButton from '../../Components/Controls/ProButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ValidatedDropDown from '../../Components/Controls/ValidatedDropdown';
import ProImagePicker from '../../Components/Controls/ProImagePicker';
import { SelectedFile } from '../../Constants/Types';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import { useSelector } from 'react-redux';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import ProWizard from '../../Components/Controls/ProWizard';
import { View } from 'react-native-ui-lib';

const icon = <Ionicons name="home" size={20} style={{ marginHorizontal: 5 }} />

const PostJobScreen: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    // const properties = [{ value: 1, label: "Property 1" }, { value: 2, label: "Property 2" }, { value: 3, label: "Property 3" }];
    const [isDropdownValid, setIsDropdownValid] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
    const user = useSelector(getUserAccount);
    const properties = useGetPropertiesQuery();
    const propertiesOptions = properties.data?.map((property: Property) => ({
        value: property.id,
        label: property.name,
      })) || [];

    const onSubmit = (data: any) => {
        console.log(data)
        const index = getValues('activeIndex');
        const nextValue = index + 1;
        if (nextValue >= steps.length) {
            console.log('End of form')
            return;
        }
        if(isDropdownValid && user){
            setValue('activeIndex', nextValue);
            console.log('Active index:', getValues('activeIndex'));
            // POST
            // uploadSelectedFiles('jobs', selectedFiles, user).then((downloadUrls) => {
            //     // Handle the downloadUrls
            //     console.log(downloadUrls);
            // });            
        }
    
    };
    const [triggerValidation, setTriggerValidation] = useState(false);

    const handleOnSubmit = () => {
        setTriggerValidation(prevState => !prevState);        
        handleSubmit(onSubmit)();
    }


    const steps = [
        <View key={0} style={{alignItems: "center", width: "100%"}}>

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
            <ValidatedDropDown setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} value='Select Property' values={propertiesOptions} errorMessage='Property is required.'></ValidatedDropDown>
            <ProTextInput
                name="budget"
                control={control}
                placeholder="Budget"
                rules={{
                    required: "Budget is required",
                }}
                keyboardType='numeric'
            />
        </View>,
        <View key={1} style={{alignItems: "center", width:"100%"}}>
            <ProImagePicker setSelectedFiles={setSelectedFiles} uploadPath='jobs'></ProImagePicker>
        </View>
    ];

//     return (
//         <BackgroundView hasScroll children={(
//             <ProWizard control={control} steps={steps} onActiveIndexChanged={(index) => console.log('Active index changed:', index)} 
//             stepLabels={['Info','Pictures']}/>
//         )}/>
//     );
// };



    // const steps = [
    //     <Wizard.Step state={WizardStepStates.ENABLED} key={0} label="Step 1" />,
    //     <Wizard.Step state={WizardStepStates.ENABLED} key={1} label="Step 2" />,
    //     <Wizard.Step state={WizardStepStates.ENABLED} key={2} label="Step 3" />,
    //   ];


    return (
        <BackgroundView hasScroll children={(
        // <View style={{alignItems: "center", width:"100%"}}>

        //     <ProTextInput
        //         name="title"
        //         control={control}
        //         placeholder="Title"
        //         rules={{
        //             required: "Title is required",
        //             minLength: { value: 10, message: "Title is too short" },
        //             maxLength: { value: 200, message: "Title is too long" },
        //         }}
        //     />
        //     <ValidatedDropDown setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} value='Select Property' values={propertiesOptions} errorMessage='Property is required.'></ValidatedDropDown>
        //     <ProTextInput
        //         name="budget"
        //         control={control}
        //         placeholder="Budget"
        //         rules={{
        //             required: "Budget is required",
        //         }}
        //         keyboardType='numeric'
        //     />
        //     <ProImagePicker setSelectedFiles={setSelectedFiles} uploadPath='jobs'></ProImagePicker>
        //     <ProButton text="Post Job" onPress={handleOnSubmit} />
        // </View>
        <ProWizard  onNext={handleOnSubmit} onSubmit={handleOnSubmit} stepLabels={['Info','Pictures']} control={control} steps={steps} onActiveIndexChanged={(index) => console.log('Active index changed:', index)} />

        )}/>
    );
};

export default PostJobScreen;