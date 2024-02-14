import { StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, getUserCredential } from '../../Services/Redux/Slices/AuthSlice';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProButton from '../../Components/Controls/ProButton';
import { useNavigation } from '@react-navigation/native';
import ProTextView from '../../Components/Layout/ProTextView';
import { Colors, Text, View } from 'react-native-ui-lib';

const ProfileViewScreen: React.FC = () =>
{
  const navigation = useNavigation();
  const user = useSelector(getUserAccount);

  const edit = () =>
  {
    navigation.navigate("ProfileEditor");
  }

  return (
    <BackgroundView children={(
      <View bg style={styles.container}>

        <ProTextView text={`Email`} isLabel/>
        <ProTextView text={`${user?.email}`}/>
        <ProTextView text={`Name`} isLabel/>
        <ProTextView text={`${user?.name.firstName + " " + user?.name.lastName}`}/>
        <ProTextView text={`Phone`} isLabel/>
        <ProTextView text={`${user?.phoneNumber}`}/>

        <ProButton marginT-20
          text={"Edit"}
          onPress={edit}
        />
      </View>

    )}
    />
  )
}

export default ProfileViewScreen

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    width: 'auto',
  },
  container:{
    width: '100%',
    alignItems: 'center',
  }
})