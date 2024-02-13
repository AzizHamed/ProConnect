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

const ProfileViewScreen: React.FC = () =>
{
  const navigation = useNavigation();
  const { email, name, photoURL, phone } = useSelector(getUserCredential);

  const edit = () =>
  {
    navigation.navigate("ProfileEditor");
  }

  return (
    <BackgroundView children={(
      <View style={{alignItems:"center"}}>

        <Text>Email: {email}</Text>
        <Text>Name: {name}</Text>
        <Text>Phone: {phone}</Text>

        <ProButton
          text={"Edit"}
          onPress={edit}
        />
      </View>

    )}
    />
  )
}

export default ProfileViewScreen

const styles = StyleSheet.create({})