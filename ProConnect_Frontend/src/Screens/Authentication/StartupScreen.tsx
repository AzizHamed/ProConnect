import React, { useEffect } from 'react'
import BackgroundView from '../../Components/Layout/BackgroundView'
import ProLoading from '../../Components/Layout/ProLoading'
import ProHeader, { HeaderType } from '../../Components/Layout/ProHeader'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { emailSignOut, webAuth } from '../../Services/Firebase/Firebase'
import { UserDetails, setUserAccount, setUserCredential } from '../../Services/Redux/Slices/AuthSlice'
import { api, CreateUserApiArg, GetUserApiArg, User } from '../../Services/Redux/Api'
import { Text } from 'react-native-ui-lib'
import ProButton from '../../Components/Controls/ProButton'

const StartupScreen:React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // const userCredentials = useSelector();
    useEffect(() => {
      const onAuthChanged = onAuthStateChanged(webAuth, (firebaseUser) => {
        if (firebaseUser !== null && firebaseUser !== undefined) {
          firebaseUser?.getIdToken(true).then(async (idToken: any) => {
              const userDetails: UserDetails = {
                email: firebaseUser?.email || "",
                name: firebaseUser?.displayName || "",
                phone: firebaseUser?.phoneNumber || "",
                idToken: idToken,
                uid: firebaseUser?.uid,
                photoURL: firebaseUser?.photoURL || "",
              };
              dispatch(setUserCredential(userDetails));
              const getUserArgs: GetUserApiArg = {
                userId: userDetails.uid || "",
              };
              console.log('Get User Args:', getUserArgs)
              const promise = dispatch(api.endpoints.getUser.initiate(getUserArgs));
              const { data } = await promise;
              const user : User = data as User;
              console.log('User Details:', userDetails);
              console.log('User:', user);
              if(user === undefined) {
                const userToCreate: CreateUserApiArg = {user: {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || 'Error',
                  name:{firstName: firebaseUser.displayName || '', lastName: ''},
                  phoneNumber: firebaseUser.phoneNumber || '',
                  accountStatus: 'SETUP',
                  photoUrl: firebaseUser.photoURL || '',                  
                },
                  
                };
                console.log('User not found, creating new user', userToCreate);
                const createUserPromise = dispatch(api.endpoints.createUser.initiate(userToCreate))
                const {data: newUser} = await createUserPromise;
                console.log('New User Data:', newUser);
                dispatch(setUserAccount(newUser as User));
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                });
              }
              else if (user.accountStatus === 'SETUP') {
                // This is a new user, load profile creation screen
                console.log('New User, loading profile editor')
                dispatch(setUserAccount(user));
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                });
              }
              else {
                // The user is registered and past the Setup stage, load main screen
                dispatch(setUserAccount(user));
                // setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                  });                  
                // }, 100);
              }
            })
            .catch((error: any) => {
              console.log("Error getting id token of user", error);
              dispatch(setUserCredential({}));
            });
        } else {
          // Handle the case when user is null or undefined
          // Display Sign In Screen
          navigation.navigate('Login');
        }
      });
      return () => {
        onAuthChanged();
      };
    }, [])
  

  return (
    <BackgroundView hasSafeAreaView children={(
        <>
            <ProHeader style={{marginTop: 75}} text='ProConnect' headerType={HeaderType.H1} center />
            <Text center marginT-50>Loading user data...</Text>
            <ProLoading displayLoadingMessage={false}/>
            <ProButton onPress={emailSignOut} text={'Cancel'} center></ProButton>
        </>
    )}></BackgroundView>
  )
}

export default StartupScreen