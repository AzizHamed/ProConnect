import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, getUserCredential } from '../../Services/Redux/Slices/AuthSlice';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProButton from '../../Components/Controls/ProButton';
import { useNavigation } from '@react-navigation/native';
import ProTextView from '../../Components/Layout/ProTextView';
import { Colors, Text, View } from 'react-native-ui-lib';
import ProfileImage from '../../Components/Layout/ProfileImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGetUserJobsByIdQuery, useGetUserProfessionsQuery } from '../../Services/Redux/Api';
import { yearsFromDate } from '../../Utility/Formatter';
import { IS_WEB } from '../../Constants/Values';
import { AirbnbRating } from 'react-native-ratings';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getSelectedUser } from '../../Services/Redux/Slices/UserSlice';
import JobsTable from '../../Features/Jobs/JobsTable';
import ProTable from '../../Components/Layout/ProTable';

const ProfileViewScreen: React.FC = () => {
  const navigation = useNavigation();
  const loggedInUser = useSelector(getUserAccount);
  const selectedUser = useSelector(getSelectedUser);
  const user = selectedUser !== null ? selectedUser : loggedInUser;
  const { data: userProfessionsData, isLoading: isLoadingUserProfessionsData } = useGetUserProfessionsQuery({userId: user?.id});
  // const { data: userJobsData } = useGetUserJobsByIdQuery({userId: user?.id || ''});
  const isWeb = IS_WEB();

  const hasProfession = userProfessionsData !== undefined && userProfessionsData.length > 0 && userProfessionsData[0].startDate !== undefined;
  const yearsOfExperience = hasProfession ? yearsFromDate(userProfessionsData[0].startDate || '2000-01-01') : 0;
  const professionName = hasProfession ? userProfessionsData[0].profession?.name : "";
  const userProfession = hasProfession ? userProfessionsData[0] : undefined;

  const edit = () => {
    navigation.navigate("ProfileEditor");
  }

  const horizontalMargin = { marginHorizontal: isWeb ? 50 : 0 };
  // console.log(selectedUser)
  // console.log(loggedInUser)
  // console.log(user)

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    if (selectedUser !== null && loggedInUser?.id !== selectedUser?.id) {
      navigation.setOptions({
        headerRight: () => (
          <Entypo size={24} style={{ marginRight: 20 }} name="chat" onPress={() => navigation.navigate('ProfileEditor')} />
        ),
      });
    }
    else {
      navigation.setOptions({
        headerRight: () => (
          <AntDesign size={24} style={{ marginRight: 20 }} name="edit" onPress={() => navigation.navigate('ProfileEditor')} />
        ),
      });
    }
  }, [navigation]);


  const ContactInfo = <View invisible style={horizontalMargin}>
    <Text bold h4>Contact Information</Text>
    <View row invisible>
      <MaterialIcons name="phone" size={24} color={Colors.textPrimary} />
      <Text marginL-10>{`${user?.phoneNumber}`}</Text>
    </View>
    <View row invisible>
      <Ionicons name="mail" size={24} color={Colors.textPrimary} />
      <Text marginL-10>{`${user?.email}`}</Text>
    </View>
  </View>

  const Ratings = <View invisible center>
    <View row invisible>
      <AirbnbRating isDisabled defaultRating={user?.averageRating} showRating={false} reviewSize={0} size={20} starContainerStyle={{ marginLeft: 2 }} />
      <Text bold marginL-10>{`${user?.averageRating} stars `}</Text>
    </View>
    <Text marginT-5 style={{ fontSize: 16 }}>{`(Out of ${user?.ratingsCount} ratings)`}</Text>
  </View>

  const BasicInfo =
    <View row width={"95%"} invisible centerH style={horizontalMargin}>
      <ProfileImage photoUrl={user?.photoUrl} size={110} />
      <View invisible centerV marginL-25>
        <Text bold h4>{`${user?.name.firstName + " " + user?.name.lastName}`}</Text>
        <Text bold>{userProfession !== undefined ? professionName : "Client"}</Text>
        {userProfession && <Text>{yearsOfExperience} years of experience</Text>}
        {Ratings}
      </View>
    </View>


  return (
    <BackgroundView hasScroll children={(
      <View bg style={styles.container} paddingT-30 center>
        <View row={isWeb} spread={isWeb} invisible width={"100%"} center>
          {BasicInfo}
          <View height={2} width={"95%"} marginV-20></View>
          {ContactInfo}
        </View>
        {user?.roles && user.roles[0].code==="HO" && <JobsTable userId={user?.id}/>}
        {user?.roles && user.roles[0].code==="PRO" && <ProTable title='Services' rows={userProfession?.services || []}/>}
        {/* 
        <ProTextView text={`Name`} isLabel/>
        <ProTextView text={`Phone`} isLabel/> */}

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
  container: {
    width: '100%',
    alignItems: 'center',
  }
})