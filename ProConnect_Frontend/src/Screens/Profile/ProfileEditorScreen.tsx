import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, getUserCredential, setUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { EMAIL_REGEX, PHONE_REGEX } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { UpdateProfileApiArg, User, useUpdateProfileMutation } from '../../Services/Redux/Api';
import ProHeader, { HeaderType } from '../../Components/Layout/ProHeader';

const ProfileEditorScreen: React.FC = () =>
{
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const navigation = useNavigation();
  const { user } = useSelector(getUserCredential);
  const name = user?.name?.firstName || '';
  const phone = user?.phoneNumber || '';
  const email = user?.email || '';
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: useMemo(() =>
    {
      console.log("User has changed");
      // console.log(email, name, photoURL, phone );
      return { email, name, phone };
    }, [email, name, phone])
  });

  const onSavePressed = async (data: any) =>
  {
    const { email, name, phone } = data;
    navigation.dispatch(DrawerActions.openDrawer());
    const updateRequest:UpdateProfileApiArg = {updateProfileRequest:{name: {firstName:name, lastName:name}, phoneNumber: phone}};
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
        />
        <ProTextInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: "Name is required",
          }}
        />

        <ProTextInput
          name="phone"
          control={control}
          placeholder="Phone"
          rules={{
            required: "Phone is required",
            pattern: { value: PHONE_REGEX, message: "Phone is invalid" }
          }}
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