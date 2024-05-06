import { ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useAddRatingMutation, useGetUserProfessionsQuery } from '../../Services/Redux/Api';
import { yearsFromDate } from '../../Utility/Formatter';
import { IS_WEB, defaultWidthValues } from '../../Constants/Values';
import { AirbnbRating } from 'react-native-ratings';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getSelectedUser } from '../../Services/Redux/Slices/UserSlice';
import JobsTable from '../../Features/Jobs/JobsTable';
import ProTable from '../../Components/Layout/ProTable';
import { setChat } from '../../Services/Redux/Slices/ChatSlice';
import RateModal from '../../Components/Controls/RateModal';

const ProfileViewScreen: React.FC = () => {
  const navigation = useNavigation();
  const loggedInUser = useSelector(getUserAccount);
  const selectedUser = useSelector(getSelectedUser);
  const user = selectedUser !== null ? selectedUser : loggedInUser;
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isRatingDisabled, setIsRatingDisabled] = useState(false);
  const [rateUser] = useAddRatingMutation();
  const dispatch = useDispatch();

  const { data: userProfessionsData, isLoading: isLoadingUserProfessionsData } = useGetUserProfessionsQuery({ userId: user?.id });
  const isWeb = IS_WEB();

  const hasProfession = userProfessionsData !== undefined && userProfessionsData.length > 0 && userProfessionsData[0].startDate !== undefined;
  const yearsOfExperience = hasProfession ? yearsFromDate(userProfessionsData[0].startDate || '2000-01-01') : 0;
  const professionName = hasProfession ? userProfessionsData[0].profession?.name : "";
  const userProfession = hasProfession ? userProfessionsData[0] : undefined;
  const horizontalMargin = { marginHorizontal: isWeb ? 50 : 0 };
  const isDifferentUser = selectedUser !== null && loggedInUser?.id !== user?.id;
  
  const userRating = (isDifferentUser && loggedInUser?.reviewsGiven) 
    ? loggedInUser?.reviewsGiven.find(review => 
        review.id === user?.reviewsReceived?.find(review2 => review2.id === review.id)?.id)?.score 
    : undefined;
    console.log('userRating', userRating)
    console.log('user', user)
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    if (isDifferentUser) {
      navigation.setOptions({
        headerRight: () => (
          <View row invisible>

          <Feather size={24} style={{ marginRight: 20 }} name="star" onPress={() => {
            setIsRatingVisible(true);
          }} />
          <Entypo size={24} style={{ marginRight: 20 }} name="chat" onPress={() => {
            dispatch(setChat({ receiverUserName: user?.name.firstName + " " + user?.name.lastName, ReceiverEmail: user?.email, openModal: false, receiverUser: user, receiverPhotoUrl: user?.photoUrl }))
            navigation.navigate('Chats');
          }} />
          </View>
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
  }, [navigation, user]);


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
      <AirbnbRating isDisabled defaultRating={user?.rating} showRating={false} reviewSize={0} size={20} starContainerStyle={{ marginLeft: 2 }} />
      <Text bold marginL-10>{`${user?.rating} stars `}</Text>
    </View>
    <Text marginT-5 style={{ fontSize: 16 }}>{`(Out of ${user?.numOfRates} ratings)`}</Text>
  </View>

  const BasicInfo =
    <View row width={"95%"} invisible centerH style={horizontalMargin}>
      <ProfileImage user={user} size={110} navigateToProfileDisabled />
      <View invisible centerV marginL-25>
        <Text bold h4>{`${user?.name.firstName + " " + user?.name.lastName}`}</Text>
        <Text bold>{userProfession !== undefined ? professionName : "Client"}</Text>
        {userProfession && <Text>{yearsOfExperience} years of experience</Text>}
        {Ratings}
      </View>
    </View>


  return (
    <BackgroundView children={(
      <ScrollView>
        <RateModal isVisible={isRatingVisible} isDisabled={isRatingDisabled}
        onRate={(rating)=>{ 
          setIsRatingDisabled(true);
          rateUser({rating: rating, userId: user?.id}).unwrap().then(()=> {
            setIsRatingDisabled(false);
            setIsRatingVisible(false);
        }).catch((error)=>{console.log('Error rating user', error)})
      }} 
        onClose={()=>{setIsRatingVisible(false);}} initialRating={userRating} title={'Rate ' + user?.name.firstName}/>
        <View bg style={styles.container} paddingT-30 center>
          <View row={isWeb} spread={isWeb} invisible width={"100%"} center>
            {BasicInfo}
            <View height={2} width={"95%"} marginV-20></View>
            {ContactInfo}
          </View>
          <View style={{width: defaultWidthValues()}} invisible>
            {user?.workAreas && <Text marginT-20>Available in the {user?.workAreas} area</Text>}
            {user?.roles && user.roles[0].code === "HO" && <JobsTable userId={user?.id} />}
            {user?.roles && user.roles[0].code === "PRO" && <BackgroundView  children={(<ProTable title='Services' rows={userProfession?.services || []} />)} />}

          </View>
         
        </View>
      </ScrollView>

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