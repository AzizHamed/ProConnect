import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { usePostJobsMutation, CreateJobRequest, useGetAllProfessionsQuery, Profession } from '../../Services/Redux/Api';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProImagePicker from '../../Components/Controls/ProImagePicker';
import { SelectedFile } from '../../Constants/Types';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import ProWizard from '../../Components/Controls/ProWizard';
import { View, Text, Colors } from 'react-native-ui-lib';
import { addJob, selectJob } from '../../Services/Redux/Slices/JobSlice';
import { useNavigation } from '@react-navigation/native';
import ProLoading from '../../Components/Layout/ProLoading';
import ValidatedDropDown from '../../Components/Controls/ValidatedDropdown';
import ProError from '../../Components/Layout/ProError';
import LoadingOrError from '../../Components/Layout/LoadingOrError';
import ProRefreshControl from '../../Components/Controls/ProRefreshControl';

const icon = <Ionicons name="home" size={20} style={{ marginHorizontal: 5 }} />

const PostJobScreen: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [isDropdownValid, setIsDropdownValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>();

    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
    const user = useSelector(getUserAccount);
    const professions = useGetAllProfessionsQuery();
    const professionsOptions = professions.data?.map((profession: Profession) => ({
        value: profession.id,
        label: profession.name,
    })) || [];
    // const properties = useGetPropertiesQuery();
    // const propertiesOptions = properties.data?.map((property: Property) => ({
    //     value: property.id,
    //     label: property.name,
    //   })) || [];
    const [postJob] = usePostJobsMutation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const setDropdownValue = (value: any) => {
        const professionIndex = professions.data?.findIndex((profession: Profession) => profession.id === value);
        setSelectedProfession(professions.data[professionIndex]);
    }

    const onSubmit = (data: any) => {
        console.log(data)
        const index = getValues('activeIndex');
        const nextValue = index + 1;
        if (index < steps.length - 1) {
            if (isDropdownValid) {
                setValue('activeIndex', nextValue);
                console.log('Active index:', getValues('activeIndex'));
            }
        }
        else if (user) {
            console.log('End of form')
            // POST
            setIsLoading(true);
            uploadSelectedFiles('jobs', selectedFiles, user).then((downloadUrls) => {
                // Handle the downloadUrls
                console.log(downloadUrls);
                const postJobRequest: CreateJobRequest = {
                    // propertyId: data.validatedDropdown, 
                    job: { title: data.title, description: data.description, budget: data.budget, photos: downloadUrls }, profession: selectedProfession
                };
                console.log('Posting job:', postJobRequest);
                postJob({ createJobRequest: postJobRequest }).unwrap().then((response) => {
                    console.log('Job posted:', response);
                    dispatch(addJob(response));
                    dispatch(selectJob(response));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    });
                }).catch((error) => {
                    console.log('Error posting job:', error);
                    setError('An error occurred while posting the job. Please try again later.\nYou can pull down to refresh.');
                });
            });
            return;
        }

    };
    const [triggerValidation, setTriggerValidation] = useState(false);

    const handleOnSubmit = () => {
        setTriggerValidation(prevState => !prevState);
        handleSubmit(onSubmit)();
    }


    const steps = [
        <View key={0} style={{ alignItems: "center", width: "100%", }}>
            <ProTextInput
                name="title"
                control={control}
                placeholder="Title"
                rules={{
                    required: "Title is required",
                    minLength: { value: 4, message: "Title is too short" },
                    maxLength: { value: 200, message: "Title is too long" },
                }}
            />
            {/* <ValidatedDropDown control={control} setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} value='Select Property' values={propertiesOptions} errorMessage='Property is required.'></ValidatedDropDown> */}
            <ProTextInput
                name="budget"
                control={control}
                placeholder="Budget"
                rules={{
                    required: "Budget is required",
                    pattern: {
                        value: /^\d+(\.\d+)?$/,
                        message: "Budget must be a number"
                    },
                    maxLength: { value: 10, message: "Budget is too long" },
                }}
                keyboardType='numeric'
            />
            <ValidatedDropDown control={control} setIsValid={setIsDropdownValid} triggerValidation={triggerValidation}
                setValue={setDropdownValue} selectedValue={undefined} values={professionsOptions} errorMessage='You must select a profession.'
                leftIcon={(
                    <Image resizeMode='contain'
                        style={{ width: 25, height: 25, marginLeft: 10 }}

                        source={{ uri: selectedProfession?.iconUrl || '' }}
                        tintColor={Colors.black}
                      />
                )}></ValidatedDropDown>
        </View>,

        <View key={1} style={{ alignItems: "center", width: "100%", }}>
            <ProTextInput
                name="description"
                control={control}
                placeholder="Description"
                rules={{
                    required: "Description is required",
                    minLength: { value: 4, message: "Description is too short" },
                    maxLength: { value: 2000, message: "Description is too long" },
                }}
                multiline
                numberOfLines={7}
            />
        </View>,

        <View key={2} style={{ alignItems: "center", width: "100%" }}>
            <Text>Add Images</Text>
            <ProImagePicker setSelectedFiles={setSelectedFiles} uploadPath='jobs'></ProImagePicker>
        </View>
    ];

    return (
        <BackgroundView children={(
            <ProRefreshControl onRefreshAction={() => { setIsLoading(false); setError(''); return Promise.resolve(); }} children={(
                isLoading ?
                    <LoadingOrError isError={error !== ''} isSuccess={error === '' && !isLoading} errorMessage={error}></LoadingOrError>
                    :
                    <ProWizard onNext={handleOnSubmit} onSubmit={handleOnSubmit} stepLabels={['Info', 'Description', 'Pictures']} control={control} steps={steps} onActiveIndexChanged={(index) => console.log('Active index changed:', index)} />
            )}></ProRefreshControl>
        )} />
    )
};

export default PostJobScreen;