import React from 'react'
import { View,StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import MyTextInput from '../../Components/Controls/MyTextInput'
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import PersonCard from '../../Features/Persons/PersonCard';
import { useGetAllUsersQuery } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import BackgroundView from '../../Components/Layout/BackgroundView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setChat } from '../../Services/Redux/Slices/ChatSlice';


const PersonsChat = () => {

  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});

  const dispatch = useDispatch();

  let schatNumber = data?.length
  const {height,width} = Dimensions.get('window');
  var numberofImages = 0
  const navigation = useNavigation();

  let chatNumber = data === undefined ? 0 : data.length
  const style = style1(chatNumber);

  return (

    <BackgroundView children={

      <ScrollView>

     

   <View style={style.container}> 
    <View style={style.searchTextInput}>
      <MyTextInput onChange={()=>{} } placeHolder={'Search'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} />
    </View>
    {/* ------------------------------------------- */}
    <View style={style.friends} >
      
      {isSuccess && data.slice(0,3).map((friend) => {
        return(

         

          <PersonCard imageurl={''} imageStyle={style.imageStyle} user={friend} compnentsUnderImage={[<Text style={{color : "white"}}>{friend.name.firstName} {friend.name.lastName}</Text>]} cardContainerStyle={style.cardContainer} />
        )
        
      })}
      
    </View>


    <View style={style.chatPeople}>
      {isSuccess && data.map((friend)=> {
        return(
          <TouchableOpacity onPress={()=>{
            dispatch(setChat({ReceiverEmail : friend.email}))
            navigation.navigate("Chats")
          }}>
          <PersonCard imageurl={''} imageStyle={style.imageStyle} user={friend} compnentsUnderImage={[]} cardContainerStyle={style.cardContainer1} additionalComponents={[<Text style={{color : "white"}}>{friend.name.firstName} {friend.name.lastName}</Text>]} containerStyle={style.containerStyle}/>

          </TouchableOpacity>
        )
      })}
    </View>
    
   

   
   </View>
   </ScrollView>
    } />
   
  )
}

export default PersonsChat


const style1 = (chatsNumber : number) =>{

  return StyleSheet.create({

    containerStyle : {
      display : "flex",
      flexDirection : "row",
      justifyContent :"flex-start",
      
    },
  
    chatPeople : {
      borderTopWidth : 1,
      borderTopColor : "gray",
      justifyContent : "space-between",
      height : 100 * chatsNumber + 8 * chatsNumber,
      marginBottom : 50,
  
    },
  
    container : {
      padding : 8,
      justifyContent : "space-between",
      flexDirection : "column",
      
      
    },
  
    searchTextInput : {
  
    },
    friends : {
      display : "flex",
      flexDirection : "row",
      justifyContent : "space-between",
      height : 130,
      marginBottom : 20,
      paddingLeft : 10,
      paddingRight : 10,
      
    },
  
    imageStyle : {
      height : 65,
      width : 65,
      borderRadius : 65,
      marginBottom : 6,
    },
  
    cardContainer : {
      height : 120,
      width :120,
      alignItems:"center",
      justifyContent:"center",
      
    },
  
    cardContainer1 : {
      height : 100,
      width : 80,
      alignItems:"center",
      justifyContent:"center",
      
    },
  })
}

