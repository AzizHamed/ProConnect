import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserCredential } from '../../Services/Redux/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { EMAIL_REGEX, PHONE_REGEX } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { useNavigation } from '@react-navigation/native';

const ProfileEditorScreen: React.FC = () =>
{
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { email, name, photoURL, phone } = useSelector(getUserCredential);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: useMemo(() =>
    {
      console.log("User has changed");
      console.log(email, name, photoURL, phone );
      return { email, name, photoURL, phone };
    }, [email, name, photoURL, phone])
  });

  const onSavePressed = async (data: any) =>
  {
    const { newEmail, newName, newPhotoURL, newPhone } = data;
    console.log(newEmail, newName, newPhotoURL, newPhone, errors);
  }

  const cancel = async () =>
  {
    navigation.navigate("Profile");

  }

  return (
    <BackgroundView children={(
      <View style={{alignItems:"center"}}>

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