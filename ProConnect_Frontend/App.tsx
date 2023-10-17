import { StyleSheet, Text, View, Platform } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import React from 'react';
import Profile from './src/Screens/Profile';
import ProButton from './src/Components/Controls/ProButton';
import { useGetUsers } from './src/Hooks/Users/useGetUsers';



export default function App() {
  const users = useGetUsers()
return (
    <View style={styles.container}>
        <ProButton borderRadius={45} outlineWidth={1} outlineColor='black' onPress={()=>{alert(users)}}/>
    </View>
      // <Profile  name={''} job={''} experience={''} telephone={''} email={''} availibality={''} location={''} profileImg={''} about='In this modified code, Ive introduced an interface GalleryImageProps to define the expected props for the GalleryImage component. The source prop is used to dynamically set the image source, and the imageStyle prop is used to allow custom styling of the Image component.Now, when you use the GalleryImage component in your application, you can pass the desired values for the source and imageStyle props:'></Profile>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


