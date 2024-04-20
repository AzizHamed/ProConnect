import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, getUserCredential, setUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { EMAIL_REGEX, IS_WEB, PHONE_REGEX, defaultWidthValues } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { UpdateProfileApiArg, User, useUpdateProfileMutation } from '../../Services/Redux/Api';
import ProHeader, { HeaderType } from '../../Components/Layout/ProHeader';
import { Keyboard } from 'react-native';
import ProTextView from '../../Components/Layout/ProTextView';
import ProfileImage from '../../Components/Layout/ProfileImage';
import ProImagePicker from '../../Components/Controls/ProImagePicker';
import ProIconButton from '../../Components/Controls/ProIconButton';
import { useImagePicker } from '../../Hooks/useImagePicker';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';

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

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);

  const { selectPictures, selectedFiles, removeSelectedPicture, clear } = useImagePicker();


  const [error, setError] = useState(null)
  const [selectedProfilePictureUri, setSelectedProfilePictureUri] = useState(user?.photoUrl || '')
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

  const onSavePressed = async (data: any) =>
  {
    const { email, firstName, lastName, phone } = data;
    // navigation.dispatch(DrawerActions.openDrawer());
    let profilePicDownloadUrl = ''
    if(selectedProfilePictureUri !== ''){
      await uploadSelectedFiles('profiles', [{uri: selectedProfilePictureUri, fileName: 'profile.jpg'}], user as User).then((res)=>{profilePicDownloadUrl = res[0]}).catch((error)=>{setError(error.message); return;})
    }
    const updateRequest:UpdateProfileApiArg = {updateProfileRequest:{name: {firstName:firstName, lastName:lastName}, phoneNumber: phone, photoUrl: profilePicDownloadUrl}};
    console.log(updateRequest);
    
    updateProfile(updateRequest).unwrap()
    .then((res)=>{
      let updatedUser = {...user, name: res.name, phoneNumber: res.phoneNumber, accountStatus: res.accountStatus, photoUrl: res.photoUrl};
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
      <View style={{alignItems:"center"}}>
        <ProHeader text={"Edit Profile"} headerType={HeaderType.H3}/>
        <View>
          <ProfileImage photoUrl={selectedProfilePictureUri} size={150}/>
          <ProIconButton displayBackground ionicon ioniconName="camera" showAddIcon onPress={() => {clear(); selectPictures('GALLERY');}} style={{position: 'absolute', right: 5, bottom: 5}}/>
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