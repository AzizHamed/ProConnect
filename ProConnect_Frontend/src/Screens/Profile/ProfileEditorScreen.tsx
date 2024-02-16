import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
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

const ProfileEditorScreen: React.FC = () =>
{
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const navigation = useNavigation();
  const { user } = useSelector(getUserCredential);
  const firstName = user?.name?.firstName || '';
  const lastName = user?.name?.lastName || '';
  const phone = user?.phoneNumber || '';
  const email = user?.email || '';

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);


  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: useMemo(() =>
    {
      console.log("User has changed");
      // console.log(email, name, photoURL, phone );
      return { email, firstName, lastName, phone };
    }, [email, firstName, lastName, phone])
  });

  const onSavePressed = async (data: any) =>
  {
    const { email, firstName, lastName, phone } = data;
    navigation.dispatch(DrawerActions.openDrawer());
    const updateRequest:UpdateProfileApiArg = {updateProfileRequest:{name: {firstName:firstName, lastName:lastName}, phoneNumber: phone}};
    console.log(updateRequest);
    
    updateProfile(updateRequest).
    unwrap().
    then((res)=>{
      let updatedUser = {...user, name: res.name, phoneNumber: res.phoneNumber, accountStatus: res.accountStatus};
      dispatch(setUserAccount(updatedUser as User))
    }).
    catch((error)=>{console.log(error)});
  }

  const cancel = async () =>
  {
    navigation.navigate("Profile");

  }
  if(user?.accountStatus === 'SETUP')
  {
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return (
    <BackgroundView children={(
      <View style={{alignItems:"center"}}>
        <ProHeader text={"Edit Profile"} headerType={HeaderType.H3}/>
        <ProTextInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
          returnKeyType='next'
          keyboardType='email-address'
          textContentType='emailAddress'
          onSubmitEditing={() => firstNameRef.current?.focus()}
        />
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

        <ProButton
          text={"Cancel"}
          onPress={cancel}
        />

        <ProButton
          text={"Reset"}
          onPress={reset}
        />
        <ProButton
          text={"Save"}
          onPress={handleSubmit(onSavePressed)}
        />
      </View>

    )}
    />
  )
}

export default ProfileEditorScreen

const styles = StyleSheet.create({})