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
import { Text, View } from 'react-native-ui-lib'
import ProButton from '../../Components/Controls/ProButton'

const StartupScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let authTokenRefreshInterval: NodeJS.Timeout | null = null;
  // const userCredentials = useSelector();
  useEffect(() => {
    const onAuthChanged = onAuthStateChanged(webAuth, (firebaseUser) => {

      authTokenRefreshInterval = setInterval(() => {
        console.log('Refreshing Auth Token');
        updateAuthState();
      }, 1000 * 60 * 50);
      updateAuthState()

      function updateAuthState() {
        if (firebaseUser !== null && firebaseUser !== undefined) {
          firebaseUser?.getIdToken(true).then(async (idToken: any) => {
            const userDetails: UserDetails = {
              email: firebaseUser?.email || "",
              name: firebaseUser?.displayName || "",
              phone: firebaseUser?.phoneNumber || "",
              idToken: idToken,
              uid: firebaseUser?.uid,
              photoURL: firebaseUser?.photoURL || "",
            }
            dispatch(setUserCredential(userDetails))
            const getUserArgs: GetUserApiArg = {
              userId: userDetails.uid || "",
            }
            // console.log('Get User Args:', getUserArgs)
            const userExistsPromise = dispatch(api.endpoints.userExists.initiate({ userId: userDetails.uid }));
            const { data: userExists } = await userExistsPromise;
            if (userExists) {
              const promise = dispatch(api.endpoints.getUser.initiate(getUserArgs))
              const { data } = await promise;
              const user: User = data as User;
                dispatch(setUserAccount(user))
                setTimeout(() => {                  
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                  })
                }, 500);              
            }
            else {
              const userToCreate: CreateUserApiArg = {
                user: {
                  id: firebaseUser.uid,
                  email: firebaseUser.email || 'Error',
                  name: { firstName: firebaseUser.displayName || '', lastName: '' },
                  phoneNumber: firebaseUser.phoneNumber || '',
                  accountStatus: 'SETUP',
                  photoUrl: firebaseUser.photoURL || '',
                }
              }
              // console.log('User not found, creating new user', userToCreate);
              const createUserPromise = dispatch(api.endpoints.createUser.initiate(userToCreate))
              const { data: newUser } = await createUserPromise
              // console.log('New User Data:', newUser);
              dispatch(setUserAccount(newUser as User))
              setTimeout(() => {                  
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }],
                })
              }, 500);

            }
        })
            .catch((error: any) => {
              console.log("Error getting id token of user", error)
              dispatch(setUserCredential({}))
            })
        } else {
          // Handle the case when user is null or undefined
          // Display Sign In Screen
          navigation.navigate('Login')
        }
      }
    });
    return () => {
      if (authTokenRefreshInterval !== null)
        clearInterval(authTokenRefreshInterval);
      onAuthChanged();
    };
  }, [])


  return (
    <BackgroundView hasSafeAreaView children={(
      <View invisible center style={{alignItems: 'center'}}>
        <ProHeader style={{ marginTop: 75 }} text='ProConnect' headerType={HeaderType.H1} center />
        <Text center marginT-50>Loading user data...</Text>
        <ProLoading displayLoadingMessage={false} />
        <ProButton onPress={emailSignOut} text={'Cancel'} center></ProButton>
      </View>
    )}></BackgroundView>
  )
}

export default StartupScreen