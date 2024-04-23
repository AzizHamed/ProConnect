import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, setUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { IS_WEB, PHONE_REGEX, defaultWidthValues } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { useNavigation } from '@react-navigation/native';
import { Profession, UpdatePersonalInfoRequest, UpdateProfessionsRequest, User, useGetAllProfessionsQuery, useGetUserRolesQuery, useUpdateProfileMutation } from '../../Services/Redux/Api';
import { Keyboard } from 'react-native';
import ProTextView from '../../Components/Layout/ProTextView';
import ProfileImage from '../../Components/Layout/ProfileImage';
import ProIconButton from '../../Components/Controls/ProIconButton';
import { useImagePicker } from '../../Hooks/useImagePicker';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import ProRadioGroup from "../../Components/Controls/ProRadioGroup";
import ProExpandableView from '../../Components/Layout/ProExpandableView';
import ValidatedDropDown from '../../Components/Controls/ValidatedDropdown';
import { Colors } from 'react-native-ui-lib';
import { createElement } from 'react-native';
import ProDatePicker from '../../Components/Controls/ProDatePicker';

const ProfileEditorScreen: React.FC = () =>
{
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const navigation = useNavigation();
  const user  = useSelector(getUserAccount);
  const firstName = user?.name?.firstName || '';
  const lastName = user?.name?.lastName || '';
  const phone = user?.phoneNumber || '';
  const email = user?.email || '';
  const { data: userRolesData } = useGetUserRolesQuery({});
  const { data: professionsData } = useGetAllProfessionsQuery({});
  const accountTypeOptions = userRolesData?.map((role) => role.name) || [];

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);

  const { selectPictures, selectedFiles, removeSelectedPicture, clear } = useImagePicker();
  const [selectedProfilePictureUri, setSelectedProfilePictureUri] = useState(user?.photoUrl || '')


  
  // The role index that is selected in the radio group (Homeowner or Professional)
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0)
  // Profession Dropdown Validation
  const [isDropdownValid, setIsDropdownValid] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
    const professionsOptions = professionsData?.map((profession: Profession) => ({
        value: profession.id,
        label: profession.name,
      })) || [];
      console.log('Professions', professionsData);
  const [error, setError] = useState(null)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: useMemo(() =>
    {
      // console.log("User has changed");
      // console.log(email, firstName, lastName, phone );
      return { email, firstName, lastName, phone };
    }, [user])
  });
  
  useEffect(() => {
      // console.log(selectedFiles);
      if(selectedFiles.size === 0) return;
      const entry = selectedFiles.entries().next();
      if(entry.done)
        setSelectedProfilePictureUri('');
      else 
        setSelectedProfilePictureUri(entry.value[entry.value.length - 1].uri || '');
      // console.log('Value:',entry.value[entry.value.length - 1].uri);
      // console.log('Selected:',selectedProfilePictureUri);
  }, [selectedFiles])

  const onSavePressed = async (profileData: any) =>
  {
    const { email, firstName, lastName, phone } = profileData;
    // navigation.dispatch(DrawerActions.openDrawer());
    let profilePicDownloadUrl = ''
    if(selectedProfilePictureUri !== ''){
      await uploadSelectedFiles('profiles', [{uri: selectedProfilePictureUri, fileName: 'profile.jpg'}], user as User)
        .then((res)=>{profilePicDownloadUrl = res[0]})
        .catch((error)=>{setError(error.message); return;})
    }
    const roles = userRolesData === undefined ? [] : [userRolesData[selectedRoleIndex]];
    const updatePersonalInfoRequest : UpdatePersonalInfoRequest = {name: {firstName:firstName, lastName:lastName}, phoneNumber: phone, photoUrl: profilePicDownloadUrl, roles: roles};
    const updateProfessionsRequest : UpdateProfessionsRequest = {professions: []};
    
    updateProfile({updateProfileRequest: { updatePersonalInfoRequest: updatePersonalInfoRequest, updateProfessionsRequest: updateProfessionsRequest}}).unwrap()
    .then((res)=>{
      let updatedUser = res;
      dispatch(setUserAccount(updatedUser as User))
    }).
    catch((error)=>{console.log(error); setError(error.message);});
  } 

  const cancel = async () =>
  {
    navigation.navigate("Profile");

  }
  if(user?.accountStatus === 'SETUP')
  {
   // navigation.dispatch(DrawerActions.closeDrawer());
  }

  return (
    <BackgroundView hasScroll children={(
      <View style={{alignItems:"center", paddingTop: 20}}>
        {/* <ProHeader text={"Edit Profile"} headerType={HeaderType.H3}/> */}
        <ProExpandableView title='Personal Information' height={320 + (user?.accountStatus === 'SETUP' ? 100 : 0)}
         children={
          (
            <View>
              
              <View style={{alignItems:'center', alignSelf:'center', width: 150}}>
                      <ProfileImage photoUrl={selectedProfilePictureUri} size={125}/>
                      <ProIconButton displayBackground ionicon ioniconName="camera" showAddIcon onPress={() => {clear(); selectPictures('GALLERY');}} style={{position: 'absolute', right: 5, bottom: 0}}/>
                    </View>
                    <ProTextView text={`${user?.email}`} />
            
                    <View style={{flexDirection: 'row', width: defaultWidthValues()}}>
            
                    <ProTextInput flexShrink marginR={5}
                      name="firstName"
                      control={control}
                      placeholder="First Name"
                      rules={{
                        required: "First Name is required",
                      }}
                      returnKeyType='next'
                      textContentType='givenName'
                      ref={firstNameRef}
                      onSubmitEditing={() => lastNameRef.current?.focus()}
                      
                      />
                    <ProTextInput flexShrink marginL={5}
                      name="lastName"
                      control={control}
                      placeholder="Last Name"
                      rules={{
                        required: "Last Name is required",
                      }}
                      returnKeyType='next'
                      textContentType='familyName'
                      ref={lastNameRef}
                      onSubmitEditing={() => phoneRef.current?.focus()}
                      />
                      </View>
                    <ProTextInput
                      name="phone"
                      control={control}
                      placeholder="Phone"
                      rules={{
                        required: "Phone is required",
                        pattern: { value: PHONE_REGEX, message: "Phone is invalid" }
                      }}
                      textContentType='telephoneNumber'
                      keyboardType='phone-pad'
                      ref={phoneRef}
                      onSubmitEditing={() => Keyboard.dismiss() }
                    />
                    {user?.accountStatus === 'SETUP' && <ProRadioGroup options={accountTypeOptions} title="Are you a homeowner or a professional?" setSelectedIndex={function (index: number): void {
                      console.log(index);
                      setSelectedRoleIndex(index);
                    } }></ProRadioGroup>
            }
            </View>            
          )
         }
        />
        {/* {(selectedRoleIndex == 1 || (user && user.roles !== undefined && user?.roles.length > 0 && user.roles[0].code === "PRO") ) &&  */}
        <ProExpandableView title='Profession' height={320}
         children={
          (
            <View style={{flexBasis: 0}}>
              <ValidatedDropDown control={control} setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} value='Select Profession' values={professionsOptions} errorMessage='Profession is required.'></ValidatedDropDown>
              <ProDatePicker></ProDatePicker>
              <Image resizeMode='contain'
                style={{ width: 200, height: 200 }}

source={{uri: 'https://res.cloudinary.com/hcti/image/fetch/c_limit,f_auto,q_auto:good,w_800/https://docs.htmlcsstoimage.com/assets/images/cat.png'}}
tintColor={Colors.secondary} 
/>
            </View>            
          )
         }
        />
        {/* } */}


        {/* <ProButton
          text={"Cancel"}
          onPress={cancel}
        /> */}

        <ProButton
          text={"Save"}
          onPress={handleSubmit(onSavePressed)}
        />
        <ProButton
          text={"Reset"}
          onPress={reset}
        />
      </View>

    )}
    />
  )
}

export default ProfileEditorScreen

const styles = StyleSheet.create({})