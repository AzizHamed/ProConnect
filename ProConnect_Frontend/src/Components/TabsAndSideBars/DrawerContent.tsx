import { DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { ImageBackground, SafeAreaView } from 'react-native'
import { View,Image,Text } from 'react-native-ui-lib'

const DrawerContent : React.FC<DrawerContentComponentProps> = (props) => {
  return (
  //   <View style={{height: "25%", alignItems:"center", justifyContent:"center", backgroundColor:"white" , opacity:0.95}}>
  //   <Image  style={{width: "50%", height:"70%", borderRadius:70}}
  //         resizeMode="contain"
  //         source={require('../../../14-84.webp')}  />
         

  //  </View>

  <SafeAreaView>
  <View
    style={{
      height: 290,
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: "#f4f4f4",
      borderBottomWidth: 1
    }}
  >
    <Image
      source={require('../../../R.jpg')}
      style={{
        height: 130,
        width: 130,
        borderRadius: 65
      }}
    />
    <Text
      style={{
        fontSize: 20,
        marginVertical: 20,
        fontWeight: "bold",
        color: "white"
      }}
    >Aziz Hamed</Text>
    <Text
      style={{
        fontSize: 16,
        color: "white"
      }}
    >Software Engineering</Text>
  </View>
  <DrawerItemList {...props} />
</SafeAreaView>
  )
}

export default DrawerContent
